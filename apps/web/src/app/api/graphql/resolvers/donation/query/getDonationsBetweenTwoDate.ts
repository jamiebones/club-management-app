import { GetDonationsBetweenTwoDateInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { allAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import { DonationUsage } from "@/app/api/models/DonationUsageModel";


const getDonationsBetweenTwoDate = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request: GetDonationsBetweenTwoDateInput },
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const { startDate, endDate } = args.request;
    console.log("Query > getDonationsBetweenTwoDate > args.fields = ", args.request);
    const start = new Date(startDate.split('T')[0]).setHours(0, 0, 0, 0);
    const end = new Date(endDate.split('T')[0]).setHours(23, 59, 59, 999);
    const donationUsage = await DonationUsage.find({date: {
      $gte: start,
      $lte: end
    }});

    console.log(donationUsage)
   
    
    return donationUsage
  } catch (err: any) {
    throw new GraphQLError("Query => DonationUsage => getDonationsBetweenTwoDate =. Error: ", err);
  }
});

export default getDonationsBetweenTwoDate;
