import { Payment } from "../../../../models/PaymentModel.js";
import { Member } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const dues = async (parent: Member, args: any, context: any, info: any) => {
    try {
      let receiverID = parent.memberID;
      const paymentData = await Payment.find({receiverID: receiverID })
      return paymentData
    } catch (err: any) {
      throw new GraphQLError(err.message);
    }
  };
  
  export default dues;
  