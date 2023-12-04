import { DuesPayment } from "../../../../models/DuesPaymentModel.js";
import { DuesPayment as Dues } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const dues = async (parent: any, args: any, context: any, info: any) => {
    try {
      console.log("parent => ", parent)
      const memberID = parent.memberID;
      const duesPayment = await DuesPayment.find({memberID: memberID});
     return duesPayment;
  
    } catch (err: any) {
      throw new GraphQLError(err.message);
    }
  };
  
  export default dues;
  