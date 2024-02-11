
import { BarSale } from "../../../../generated/graphqlStaffClub";
import { Members } from "@/app/api/models/MemberModel";
import { GraphQLError } from 'graphql';


const customer = async (parent: BarSale, args: any, context: any, info: any) => {
    try {
      const memberID = parent.memberID
      const memberData = await Members.findOne({memberID: memberID })
      return memberData;
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => customer`);
    }
  };
  
  export default customer;
  