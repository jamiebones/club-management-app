import { DuesPayment } from "../../../../models/DuesPaymentModel";
import { Members } from "../../../../models/MemberModel";
import { AddDuesPaymentInput, DuesPayment as DuesPaymentType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, onlyFinancialAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const addDuesPayment = 
combineResolvers(
  IsAuthenticated,
  onlyFinancialAllowed,
async (
  parent: any,
  args: { request: AddDuesPaymentInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { amountPaid, date, memberID, paymentFor, paymentType } = args.request;
    console.log("Mutation > addDuesPayment > args.fields = ", args.request);
    if (!amountPaid || !memberID || !paymentFor || !paymentType ) {
        throw new GraphQLError("The memberID, amountPaid, paymentFor, paymentType are all required fields");
    }
    let paymentDate: Date = new Date();
    if ( date ){
        paymentDate = new Date(date);
    }
    let fields:DuesPaymentType = {
        date: paymentDate,
        amountPaid,
        memberID,
        paymentFor,
        paymentType
    };

    const member = await Members.findOne({_id: memberID});
    if (!member){
        throw new GraphQLError("The given memberID is not a member");
    }
    const duesPayment = await new DuesPayment(fields).save();
    console.log("dues payment => ", duesPayment);
    return duesPayment;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => DrinksBanked => addBankedDrinks: ${err}` );
  }
});

export default addDuesPayment;

