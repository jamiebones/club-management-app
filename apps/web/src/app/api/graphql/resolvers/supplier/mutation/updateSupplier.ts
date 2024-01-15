import { Supplier } from "../../../../models/SupplierModel";
import { Supplier as SupplierType, UpdateSupplierInput} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, allowAdministrativeTask} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const updateSupplier = 
combineResolvers(
  IsAuthenticated,
  allowAdministrativeTask,
async (
  parent: any,
  args: { request: UpdateSupplierInput},
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const { contact, supplierID, address, name  } = args.request;
    console.log("Mutation > updateSupplier > args.fields = ", args.request);
    
    const fields: any = {

    };

    if (!supplierID) throw new GraphQLError("Please the supplierID is a required field");

    const supplier = await Supplier.findOne({_id: supplierID});

    if (!supplier){
        throw new GraphQLError("The supplied ID does not belong to any supplier")
    }

    if ( name ){
        fields.name = name
    }
    if ( address ) {
        fields.address = address;
    }

    let contactArray = [];
    if ( contact && contact.length > 0 ) {
        if ( supplier.contact ){
            let oldContacts:String[];
            oldContacts = supplier.contact;
            const uniqueContanct = contact?.filter((val:any) => {
              return !oldContacts.includes(val);
            })
          contactArray = [ ...uniqueContanct, ...supplier.contact ]
          fields.contact = contactArray;
        } else {
          fields.contact = contact
        }
    } 

    console.log("fields ", fields)

   const updatedSupplier = await Supplier.findOneAndUpdate({_id : supplierID}, fields,  { new: true },)
   return updatedSupplier ;
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => updateStaff : ${err} `);
  }
});

export default updateSupplier
