import { Payment } from "../../../../models/PaymentModel.js";
import { Payment as PaymentType, Member, Staff} from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const dues = async (parent: any, args: any, context: any, info: any) => {
    try {
      let receiverID: String = "";
      if ( parent.memberID ){
        //we have a staff here
        receiverID = parent.memberID;
      } else if ( parent.employeeID ){
        receiverID = parent.employeeID;
      }
      const paymentData = await Payment.find({receiverID: receiverID })
      return paymentData
    } catch (err: any) {
      throw new GraphQLError(err.message);
    }
  };
  
  export default dues;
  