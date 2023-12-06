import { DrinksBank } from "../../../../models/DrinksBankModel.js";
import { Member } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const drinksBanked = async (parent: Member, args: any, context: any, info: any) => {
    try {
      const memberID = parent.memberID
      const drinksBankedData = await DrinksBank.find({memberID: memberID })
      return drinksBankedData
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => drinksBanked`);
    }
  };
  
  export default drinksBanked;
  