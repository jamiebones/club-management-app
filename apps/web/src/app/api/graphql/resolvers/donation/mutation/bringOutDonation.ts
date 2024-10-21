import { BringOutBeerInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, barSalesAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import { DonatedStock } from "@/app/api/models/DonatedStock";
import { DonationUsage } from "@/app/api/models/DonationUsageModel";


const bringOutDonatedBeer = 
combineResolvers(
  IsAuthenticated,
  barSalesAllowed,
async (
  parent: any,
  args: { request: BringOutBeerInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const {drinks } = args.request
    if (drinks?.length == 0 ){
      throw new Error("Donated drinks cannot be 0")
    }
    let total = 0;
    for(let drink of drinks!){
      const query =  { $regex: new RegExp(drink?.brand!, 'i') };
      const item = await DonatedStock.findOneAndUpdate(
        { brand: query, quantity: { $gte: drink?.quantity } }, 
        { $inc: {quantity: -drink?.quantity!}},
        {new: true}
        // Ensure there's enough stock
      );
      if (!item){
        throw new GraphQLError(`The number in stock is limited: for ${drink?.brand}`);
      }
      total += +drink?.quantity!
    }
    //save the donation DonationUsage
    const newDonationUsage = {
        drinks: drinks,
        date: new Date(),
        staffID: context.token.bioDataId
    }
    await new DonationUsage(newDonationUsage).save();

    return total;
  
  } catch (err: any) {
    throw new GraphQLError(`Mutation => DonatedStock => bringOutDonatedBeer: ${err}` );
  }
});

export default bringOutDonatedBeer;
