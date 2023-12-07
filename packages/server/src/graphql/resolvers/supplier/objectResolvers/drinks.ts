import { BarStock } from "../../../../models/BarStockModel.js";
import { Supplier } from '../../../../generated/graphqlStaffClub.js';
import { GraphQLError } from 'graphql';


const drinks = async (parent: Supplier, args: any, context: any, info: any) => {
    try {
      const supplierID = parent._id;
      const drinksSupplied = await BarStock.find({ supplierID: supplierID }).sort({date: 1 })
      return drinksSupplied;
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => salary`);
    }
  };
  
  export default drinks;
  