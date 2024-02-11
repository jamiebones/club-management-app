
import { BarSale } from "../../../../generated/graphqlStaffClub";
import { Members } from "@/app/api/models/MemberModel";
import { Staff } from "@/app/api/models/StaffModel";
import { GraphQLError } from 'graphql';


const seller = async (parent: BarSale, args: any, context: any, info: any) => {
    try {
      const seller = parent.staffID
      const [ staff, member ] = await Promise.all([
            Staff.findOne({_id: seller}).lean(),
            Members.findOne({_id: seller}).lean()
      ]) as [any, any]

     
      
      if ( staff ){
      
        return { ...staff, __typename: 'Staff'};
      }
      if ( member ){
        return { ...member, __typename: 'Member'}
      }
    } catch (err: any) {
      throw new GraphQLError(`${err.message} => ObjectResolver => seller`);
    }
  };
  
  export default seller;
  