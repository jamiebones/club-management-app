import { BarStock } from "../../../../models/BarStockModel.js";
import { Supplier } from "../../../../models/SupplierModel.js";
import { BarStock as BarStockType, AddBarStockInput } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';

const addBarStock = async (
  parent: any,
  args: { request: AddBarStockInput },
  context: any,
  info: any,
)=> {
  try {
    const { supplierID,amount, saleType, itemsSupplied, date } = args.request;
    console.log("Mutation > addBarStock > args.fields = ", args.request);
    const fields:BarStockType = {
      supplierID,
      amount, saleType, itemsSupplied, date 
    };
    
    //check if the ID is a valid supplier
    const supplier = await Supplier.findOne({_id: supplierID});
    if (!supplier){
        throw new GraphQLError("Supplier ID is not a valid supplier");
    }
    const newStock = await new BarStock(fields).save();
    console.log("new bar stocks ", newStock);
    return newStock;

  } catch (err: any) {
    throw new GraphQLError(`Mutation => BarStock => addBarStock: ${err}` );
  }
};

export default addBarStock;
