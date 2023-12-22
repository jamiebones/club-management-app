import { Payment as PaymentModel } from "../../../../models/PaymentModel";
import { Staff } from '../../../../generated/graphqlStaffClub';
import { GraphQLError } from 'graphql';


const salary = async (parent: Staff, args: any, context: any, info: any) => {
    try {
      const staffID = parent._id;
      const salary = await PaymentModel.find({ receiverID: staffID }).lean()
      return salary
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => salary`);
    }
  };
  
  export default salary;
  