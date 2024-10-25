import { BarSales } from "../../../../models/BarSaleModel";
import { Items } from "@/app/api/models/ItemModel";
import { Members } from "../../../../models/MemberModel";
import { Staff } from "../../../../models/StaffModel";
import { BarSale as BarSaleType, NewBarSaleInput, Item, SaleTypeEnum, PaymentTypeEnum, BeerBrandType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import { IsAuthenticated, barSalesAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import dbConnect from "../../../../../../../lib/dbConnect";
import mongoose from "mongoose";

const newBarSale = 
combineResolvers(
  IsAuthenticated,
  barSalesAllowed,
async (
  parent: any,
  args: { request: NewBarSaleInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect()
    const { memberID, items,
        amount,
        paymentType,
        saleType } = args.request;
    console.log("Mutation > newBarSale > args.fields = ", args.request);
    const fields: BarSaleType = {
      memberID,
      staffID: context.token.bioDataId,
      items,
      amount,
      // paymentType: paymentType as PaymentTypeEnum,
      // saleType: saleType as SaleTypeEnum,
      date: new Date()
    };
 
  //find the person selling the drink
  const [ sellerStaff, sellerMember, memberBuying ] = await Promise.all([
    Staff.findOne({_id: new mongoose.Types.ObjectId(context.token.bioDataId)}).lean(),
    Members.findOne({_id: new mongoose.Types.ObjectId(context.token.bioDataId)}).lean(),
    Members.findOne({memberID: memberID}).lean(),
  ]);

  if (!sellerMember && !sellerStaff){
    throw new GraphQLError("The seller not found in the system");
  }

  if (!memberBuying){
    throw new GraphQLError("The member is invalid");
  }
 
 
  let updates: {
    totalStock: number
    _id: string
  }[] = [];

  const itemsBeer = [...items!];
  for (let i = 0; i < itemsBeer.length; i++) {
    const beer = itemsBeer[i];
    if (beer) {
      const brandPattern = new RegExp(beer.brand!, "i");
      const item: Item | null = await Items.findOne({
        name: { $regex: brandPattern },
      }).lean();
  
      const remainingStock =
        +item?.totalStock! - +beer.quantity!;
  
      if (remainingStock >= 0) {
        updates.push({
          _id: item?._id!,
          totalStock: remainingStock,
        });
      } else {
        // Throw an error
        throw new GraphQLError(
          `${beer.brand} total in stock is ${remainingStock}.`
        );
      }
    }
  }

    updates.forEach(async ({_id, totalStock})=> {
      const item = await Items.findOneAndUpdate({_id : new mongoose.Types.ObjectId(_id)}, {$set: {totalStock: totalStock}}, { new: true })
    });
    const newSale = await new BarSales(fields).save();
    console.log("new bar sales, => ", newSale);
    return newSale;
    } catch (err: any) {
      throw new GraphQLError(`Mutation => BarSale => newBarSale: ${err}` );
    }
});

export default newBarSale;
