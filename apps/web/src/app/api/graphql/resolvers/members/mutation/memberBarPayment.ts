import { Members } from "../../../../models/MemberModel";
import { Staff } from "../../../../models/StaffModel";
import {  MemberBarPaymentInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, barSalesAllowed} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const memberBarPayment = 
combineResolvers(
  IsAuthenticated,
  barSalesAllowed,
async (
  parent: any,
  args: { request: MemberBarPaymentInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { amount, date, memberID  } = args.request;
    console.log("Mutation > addMemberPayment > args.fields = ", args.request);
    const sellerID = context.token.bioDataId;

    const [member, staff ] = await Promise.all([
        Members.findOne({_id: sellerID }),
        Staff.findOne({_id: sellerID }),
    ]);

    let firstname = "";
    let surname = "";

    if ( member ){
       firstname = member.firstname;
       surname = member.surname;
    }
    if ( staff ){
        firstname = staff.firstname;
        surname = staff.surname;
     }
   
     const data = {
        amount,
        date,
        collectedBy: `${firstname} ${surname}`
     }

    const memberPayment = await Members.findOneAndUpdate({memberID: memberID}, {$push: {payments: data}}, {new: true});
    return memberPayment;
    
  
  } catch (err: any) {
    throw new GraphQLError(err.message, {
        extensions: { code: 'YOUR_ERROR_CODE' },
    });
  }
});

export default memberBarPayment;
