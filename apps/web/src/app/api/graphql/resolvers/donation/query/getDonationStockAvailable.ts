import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { allAllowed, IsAuthenticated } from "../../../authorization/auth";
import { DonatedStock } from "@/app/api/models/DonatedStock";
import { combineResolvers } from "graphql-resolvers";


const getDonationStockAvailable = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { },
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const donatedStocks = await DonatedStock.find({}).lean();
    console.log("donated stocks ", donatedStocks);
    return donatedStocks;
  } catch (err: any) {
    throw new GraphQLError("Query => getDonationStockAvailable =. Error: ", err);
  }
});

export default getDonationStockAvailable;
