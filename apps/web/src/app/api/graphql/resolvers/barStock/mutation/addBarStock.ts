import { BarStock } from "../../../../models/BarStockModel";
import { Items } from "../../../../models/ItemModel";
import { Payment } from "../../../../models/PaymentModel";
import { Supplier } from "../../../../models/SupplierModel";
import { BarStock as BarStockType, AddBarStockInput, Payment as PaymentType, PaymentCategoryEnum } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, barStockAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


const addBarStock = 
combineResolvers(
  IsAuthenticated,
  barStockAllowed,
async (
  parent: any,
  args: { request: AddBarStockInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { supplierID,amount, itemsSupplied, date } = args.request;
    console.log("Mutation > addBarStock > args.fields = ", args.request);
    const fields: BarStockType = {
      supplierID,
      amount, 
      itemsSupplied,
      date: new Date(date)
    };
  
    //check if the ID is a valid supplier
    const supplier = await Supplier.findOne({_id: supplierID});
    if (!supplier){
        throw new GraphQLError("Supplier ID is not a valid supplier");
    }
    //get the items and increament the totalStock
    if ( itemsSupplied?.length! > 0 ){
        itemsSupplied?.forEach(async ({_id, numberOfBottles })=> {
          console.log("_id of Item =>", _id)
           await Items.findOneAndUpdate({_id: _id }, {$inc: {totalStock: numberOfBottles}});
        })
    }
    const newStock = await new BarStock(fields).save();
    // if ( fields.saleType === "CASH" ){
      let payment: PaymentType = {
        receiverID: supplierID,
        amountPaid: amount,
        paymentCategory: "PURCHASES" as PaymentCategoryEnum,
        paymentFor: "Payment made for replenishing stock at the bar",
        date: new Date(date)
       }
      const newPayment = await new Payment(payment).save();
      console.log("new payment => ", newPayment);
      return newStock;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => BarStock => addBarStock: ${err}` );
  }
});

export default addBarStock;
