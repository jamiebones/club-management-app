import { Supplier } from "../../../../models/SupplierModel";
import { Supplier as SupplierType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, allowAdministrativeTask} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


const getSuppliers = 
combineResolvers(
  IsAuthenticated,
  allowAdministrativeTask,
async (
  parent: any,
  args: { request: null },
  context: any,
  info: any,
):Promise<SupplierType> => {
  try {
    console.log("Query > getSuppliers > args.fields = ", args.request);
    await dbConnect();
    const suppliers: SupplierType = await Supplier.find({}).lean();
    console.log("supplier ", suppliers)
    return suppliers;
  } catch (err: any) {
    throw new GraphQLError("Query => getSuppliers =. Error: ", err);
  }
});

export default getSuppliers;
