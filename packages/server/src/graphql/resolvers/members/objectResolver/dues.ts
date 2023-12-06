import { DuesPayment } from "../../../../models/DuesPaymentModel.js";
import { DuesPayment as Dues, Member } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const dues = async (parent: Member, args: any, context: any, info: any) => {
    try {
      const memberID = parent.memberID;
      const duesPayment = await DuesPayment.find({memberID: memberID});
     return duesPayment;
  
    } catch (err: any) {
      throw new GraphQLError(err.message);
    }
  };
  
  export default dues;
  