import { Supplier } from "../../../../models/SupplierModel.js";
import { Supplier as SupplierType, AddSupplierInput } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';

const addNewSupplier = async (
  parent: any,
  args: { request: AddSupplierInput},
  context: any,
  info: any,
) => {
  try {
      const { address, contact, name } = args.request;
      console.log("Mutation > addNewSupplier > args.fields = ", args.request);
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
};

export default addNewSupplier;
