import { Items } from "../../../../models/ItemModel";
import { NewDonationInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, barStockAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import { Donation } from "@/app/api/models/DonationModel";
import { DonatedStock } from "@/app/api/models/DonatedStock";


const addNewDonation = 
combineResolvers(
  IsAuthenticated,
  barStockAllowed,
async (
  parent: any,
  args: { request: NewDonationInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { drinks } = args.request;
    console.log("Mutation > addNewDonations > args.fields = ", args.request);
   
    if (!drinks?.length){
      throw new GraphQLError("The drinks for donation should not be empty")
    }

    // let outOfStockDrinks = [];

    // for(let drink of drinks){
    //   const query = { name: { $regex: new RegExp(drink?.brand!, 'i') } };
    //    const drinkInStock = await Items.findOne({name: query, totalStock: { $gte: drink?.quantity } });
    //    if (!drinkInStock){
    //     outOfStockDrinks.push(drink?.brand);
    //    }
    // }

    // if ( outOfStockDrinks.length > 0 ){
    //   //we have some of the drinks not in stock
    //   const noStocktext = `The following drinks are out of stock: ${outOfStockDrinks.join()}`;
    //   throw new GraphQLError(noStocktext);
    // }

    // for(let drink of drinks){
    //   const query = { name: { $regex: new RegExp(drink?.brand!, 'i') } };
    //   const item = await Items.findOneAndUpdate(
    //     { name: query, totalStock: { $gte: drink?.quantity } }, // Ensure there's enough stock
    //     { $inc: { totalStock: -drink?.quantity! } }, // Reduce the stock
    //     { new: true } // Return the updated document
    //   );
    //   if (!item){
    //     throw new GraphQLError(`The number in stock is limited: for ${drink?.brand}`);
    //   }
    // }

    //save the donation and update the stock
    const newDonation = {
      date: new Date(), 
      drinks,
      staffID: context.token.bioDataId
    }

    await new Donation(newDonation).save();

    //increment the donation stock here;
    let stockAdded = 0;
    for(let drink of drinks){
      // const query =  new RegExp(drink?.brand!, 'i');
      stockAdded += drink?.quantity!
      await DonatedStock.findOneAndUpdate(
        { brand: drink?.brand?.toLowerCase() },
        { $inc: { quantity: drink?.quantity! } },
        {
          new: true, // Return the updated document
          upsert: true, // Create the document if it doesn't exist
          setDefaultsOnInsert: true // Use default values for fields if inserting a new document
      }
      );
    }
  return stockAdded;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => Donation => addNewDonation: ${err}` );
  }
});

export default addNewDonation;
