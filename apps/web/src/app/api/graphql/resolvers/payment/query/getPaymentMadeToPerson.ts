import { Payment as PaymentType, GetPaymentInput } from "../../../../generated/graphqlStaffClub";
import { Payment } from "../../../../models/PaymentModel";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";



const getPaymentMadeToPerson = 
combineResolvers(
  IsAuthenticated,
 
async (
  parent: any,
  args:  { request: GetPaymentInput },
  context: any,
  info: any,
):Promise<PaymentType> => {
  try {

    console.log("Query > getPaymentMadeToPerson > args.fields = ", args.request);
    const { receiverID } = args.request;
    await dbConnect();
    const payment: PaymentType = await Payment.find({receiverID: receiverID}).sort({date: -1}).lean();
    return payment;
  } catch (err: any) {
    throw new GraphQLError("Query => getPaymentMadeToPerson =. Error: ", err);
  }
});

export default getPaymentMadeToPerson;
