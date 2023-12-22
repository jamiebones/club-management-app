import { Staff } from "../../../../models/StaffModel"
import { Members } from "../../../../models/MemberModel";
import { Supplier } from "../../../../models/SupplierModel";
import { Payment as PaymentType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';


const receiver = async (parent: PaymentType, args: any, context: any, info: any) => {
    try {
        const [ member, staff, supplier ] = await Promise.all([
            Members.findOne({_id: parent.receiverID}).lean(),
            Staff.findOne({_id: parent.receiverID }).lean(),
            Supplier.findOne({_id: parent.receiverID }).lean()
          ]);
    if ( member ) {
        return { ...member, __typename: 'Member'};
    }
   
    if ( staff ) {
        return {...staff, __typename: 'Staff'}
    }
    if ( supplier ) {
        return {...supplier, __typename: 'Supplier'}
    }
  
    } catch (err: any) {
      throw new GraphQLError(err.message);
    }
  };
  
  export default receiver;
  