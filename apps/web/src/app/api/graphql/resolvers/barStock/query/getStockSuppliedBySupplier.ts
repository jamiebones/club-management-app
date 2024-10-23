import { BarStock } from "../../../../models/BarStockModel";
import { Supplier } from "../../../../models/SupplierModel";
import { FindBarStockInput, BarStock as BarStockType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { allAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


const getStockSuppliedBySupplier = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request:FindBarStockInput },
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const { _id } = args.request;
    console.log("Query > getStockSuppliedBySupplier > args.fields = ", args.request);
    if (! _id ) {
      throw new GraphQLError("The supplier _id is a required field");
   }
    const supplier = await Supplier.findOne({_id: _id});
    if (!supplier){
        throw new GraphQLError("Suppplied _id is not a valid supplier ID")
    }
    const suppliedStocks = await BarStock.find({ supplierID: _id}).sort({date: -1}).lean();
    console.log("supplied data ", suppliedStocks)
    return suppliedStocks
  } catch (err: any) {
    throw new GraphQLError("Query => getStockSuppliedBySupplier =. Error: ", err);
  }
});

export default getStockSuppliedBySupplier;
