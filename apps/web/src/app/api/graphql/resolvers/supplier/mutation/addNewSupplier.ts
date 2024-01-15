import { Supplier } from "../../../../models/SupplierModel";
import { Supplier as SupplierType, AddSupplierInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, allowAdministrativeTask} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const addNewSupplier = 
combineResolvers(
  IsAuthenticated,
  allowAdministrativeTask,
async (
  parent: any,
  args: { request: AddSupplierInput},
  context: any,
  info: any,
) => {
  try {
      await dbConnect();
      const { address, contact, name } = args.request;
      console.log("Mutation > addNewSupplier >> args.fields = ", args.request);
      const fields:SupplierType = {};

      if ( !name && !contact ) {
        throw new GraphQLError("Supplier name and address is required")
      }
      if ( address ){
        fields.address = address;
      }
      fields.name = name;
      fields.contact = contact;

      const newSupplier = await new Supplier(fields).save();
      console.log("supplier data ", newSupplier);
      return newSupplier
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => addNewSupplier : ${err} `);
  }
});

export default addNewSupplier;
