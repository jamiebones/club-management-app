import { DrinksBank } from "../../../../models/DrinksBankModel";
import { Members } from "../../../../models/MemberModel";
import { Staff } from "../../../../models/StaffModel";
import { DrinksBank as DrinksBankType, AddBankedDrinksInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { onlySalesAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const addBankedDrinks = 
combineResolvers(
  IsAuthenticated,
  onlySalesAllowed,
async (
  parent: any,
  args: { request: AddBankedDrinksInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { memberID, staffID, items,  } = args.request;
    console.log("Mutation > addBankedDrinks > args.fields = ", args.request);
    if (items?.length == 0 ) {
        throw new GraphQLError("Banked items musst be greater than 0");
    }
    
    const fields: DrinksBankType = {
        dateBanked : new Date(),
        drinksLeft: items,
        items: items,
        memberID: memberID,
        staffID: staffID,
        allDrinksCollected: false

      };
    //check if the ID is a valid supplier
    const [member, staff ] = await Promise.all([
        Members.findOne({_id: memberID}),
        Staff.findOne({_id: staffID})
    ])
    
    if (!member || !staff){
        throw new GraphQLError("MemberID or StaffID supplied are not valid ID");
    }
    //check if they have drinks they have not collected before
    const checkForDrinksCollected = await DrinksBank.findOne({memberID: memberID, allDrinksCollected: false}).lean();
    if ( checkForDrinksCollected ) {
        throw new GraphQLError("You akready have some drinks banked that has not been collected.")
    }
    const drinksBanked = await new DrinksBank(fields).save()
    console.log("drinks banked => ",  drinksBanked);
    return drinksBanked;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => DrinksBanked => addBankedDrinks: ${err}` );
  }
});

export default addBankedDrinks;
