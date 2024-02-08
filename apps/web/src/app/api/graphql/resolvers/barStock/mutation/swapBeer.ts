import { Items } from "../../../../models/ItemModel";
import { SwapBeerInput, Item as ItemType } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, barSalesAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


const swapBeer = 
combineResolvers(
  IsAuthenticated,
  barSalesAllowed,
async (
  parent: any,
  args: { request: SwapBeerInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { swapFromBeerID, swapToBeerID } = args.request;
    console.log("Mutation > swapBeer > args.fields = ", args.request);
    //get increment or decrement accourdingly

    const [from, to ] = await Promise.all([
        Items.findOne({_id: swapFromBeerID}).lean(),
        Items.findOne({_id: swapToBeerID}).lean(),
    ]) as [ItemType, ItemType];

    if ( to?.totalStock == 0 ){
      throw new Error("You cannot swap a drink not in stock");
    }

    await Items.findOneAndUpdate({_id: swapFromBeerID}, {$inc: {totalStock: 1}});

    await Items.findOneAndUpdate({_id: swapToBeerID}, {$inc: {totalStock: -1}})
  
    return true;

  } catch (err: any) {
    throw new GraphQLError(`Mutation => BarStock => swapBeer: ${err}` );
  }
});

export default swapBeer;
