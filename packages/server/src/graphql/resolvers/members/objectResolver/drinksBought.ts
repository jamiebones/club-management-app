import { BarSales } from "../../../../models/BarSaleModel.js";
import { GraphQLError } from 'graphql';


const drinksBought = async (parent: any, args: any, context: any, info: any) => {
    try {
      const memberID = parent.memberID
      const drinksBoughtData = await BarSales.find({memberID: memberID })
      return drinksBoughtData
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => drinksBought`);
    }
  };
  
  export default drinksBought;
  