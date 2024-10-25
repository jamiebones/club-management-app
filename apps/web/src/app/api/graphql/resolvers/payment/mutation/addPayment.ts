
import {  AddPaymentInput, Payment as PaymentType } from "../../../../generated/graphqlStaffClub";
import { Payment } from '../../../../models/PaymentModel';
import { Staff } from "../../../../models/StaffModel";
import { Supplier } from "../../../../models/SupplierModel";
import { GraphQLError } from 'graphql';
import { Members } from "../../../../models/MemberModel";
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, onlyTreasurerAllowed} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const addPayment = 
combineResolvers(
  IsAuthenticated,
  onlyTreasurerAllowed,
async (
  parent: any,
  args: { request: AddPaymentInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { amountPaid, paymentCategory, paymentFor, receiverID, date } = args.request;
    console.log("Mutation > addPayment > args.fields = ", args.request);
    if ( !amountPaid ){
      throw new GraphQLError(`amountPaid is required`);
    }
    if ( !paymentCategory ){
      throw new GraphQLError(`paymentCategory is required`);
    }
    if ( !paymentFor ){
      throw new GraphQLError(`paymentFor is required`);
    }

    if ( !receiverID ){
      throw new GraphQLError(`receiverID is required`);
    }

    const [ member, staff, supplier ] = await Promise.all([
      Members.findOne({_id: receiverID}),
      Staff.findOne({_id: receiverID }),
      Supplier.findOne({_id: receiverID })
    ]);

    let exist = false;

    if ( member ) {
      exist = true;
    }
    if ( staff ){
      exist = true;
    }
    if ( supplier ){
      exist = true;
    }

    if (!exist){
      throw new GraphQLError(`The receiverID does not belong to either a Staff, Member or Supplier`);
    }
    let paymentDate: Date = new Date();
    if ( date ){
      paymentDate = new Date(date);
    }

    let fields = {
      amountPaid, 
      paymentCategory, 
      paymentFor, 
      receiverID,
      date: paymentDate
    }
    const payment = await new Payment(fields).save();
    return payment;
  
  } catch (err: any) {
    throw new GraphQLError(`Mutation => Payment => addPayment : ${err}` );
  }
});

export default addPayment;
