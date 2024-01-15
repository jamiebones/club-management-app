import { DrinksBank } from "../../../../models/DrinksBankModel";
import { Members } from "../../../../models/MemberModel";
import { Staff } from "../../../../models/StaffModel";
import { DrinksBank as DrinksBankType, CollectBankedDrinksInput, DrinksCollector } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { onlySalesAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


interface DrinksInterface {
    "brand": string | undefined | null;
    "quantity": number | undefined | null;
}

const collectBankedDrinks = 

combineResolvers(
  IsAuthenticated,
  onlySalesAllowed,
async (
  parent: any,
  args: { request: CollectBankedDrinksInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { drinksToCollect, memberID, staffID } = args.request;
    console.log("Mutation > collectBankedDrinks > args.fields = ", args.request);
    if (drinksToCollect?.length == 0 ) {
        throw new GraphQLError("Collected drinks should not be empty");
    }
    const fields: DrinksBankType = {
        dateBanked : new Date(),
        memberID: memberID,
        staffID: staffID,
      };
    //check if the ID is a valid supplier
    const [member, staff ] = await Promise.all([
        Members.findOne({_id: memberID}),
        Staff.findOne({_id: staffID})
    ])
    
    if (!member || !staff){
        throw new GraphQLError("MemberID or StaffID supplied are not valid ID");
    }
    const getBankedDrinks = await DrinksBank.findOne({memberID: memberID, allDrinksCollected: false}).lean();
    if (!getBankedDrinks ){
        throw new GraphQLError("You don't have any banked drinks");
    }

    let drinksLeftToCollect: DrinksInterface[] = [];

    
   getBankedDrinks?.drinksLeft?.map((drinks: any)=> {
        //check the drinksToCollect
       const brand = drinksToCollect?.find((d)=> {
          return d.brand?.trim().toLowerCase() == drinks?.brand?.trim().toLowerCase()
        });
       if ( brand && drinks ){
        //reduce the quantity from what left
        let remain = drinks?.quantity;
        let collected = brand?.quantity;
        let value = 0;
        if ( remain && collected ){
            value = remain - collected
        }
        const collectedDrink = {
            brand: brand?.brand,
            quantity: value
        }
        drinksLeftToCollect.push(collectedDrink);
       } else {
         //the brand is not been collected yet
         drinksLeftToCollect.push(drinks as DrinksInterface);
       }
    });

    //check if everything has been collected here:
    let allCollected = true;
    drinksLeftToCollect?.map(({quantity})=> {
       if ( quantity != 0 ){
          allCollected = false;
       }
    });



    if ( allCollected ){
        fields.allDrinksCollected = true
    }
    const newCollector: DrinksCollector = {
      staffId: staffID, 
      date: new Date()
    }
    fields.collectedDates = [...getBankedDrinks.collectedDates, newCollector]
    fields.drinksLeft = drinksLeftToCollect;

    let updatedDrinks = await DrinksBank.findOneAndUpdate({_id : getBankedDrinks._id }, {$set: fields}, { new: true})
    
    console.log("updated drinks => ", updatedDrinks)
    return updatedDrinks;

  } catch (err: any) {
    throw new GraphQLError(`Mutation => DrinksBanked => addBankedDrinks: ${err}` );
  }
});

export default collectBankedDrinks;
