import { DuesPayment } from "../../../../models/DuesPaymentModel";
import { FindMemberDuesPaidInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';



const findMemberDuesPaid = async (
  parent: any,
  args: { request: FindMemberDuesPaidInput },
  context: any,
  info: any,
) => {
  try {
    const { memberID } = args.request;
    console.log("Query > findMemberDuesPayment > args.fields = ", args.request);
    if (! memberID ) {
      throw new GraphQLError("The memberID is a required field");
   }
    const duesPayment = await DuesPayment.find({memberID: memberID}).sort({date: 1}).lean();
    console.log("dues payment => ", duesPayment);
    return duesPayment;
  } catch (err: any) {
    throw new GraphQLError("Query => findMemberDuesPayment =. Error: ", err);
  }
};

export default findMemberDuesPaid;
