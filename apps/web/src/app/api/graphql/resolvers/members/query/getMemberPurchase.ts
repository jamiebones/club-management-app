import { Members } from "../../../../models/MemberModel";
import { BarSales } from "@/app/api/models/BarSaleModel";
import { MemberPurchase, MemberPurchaseInput} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { allAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";


const getMemberPurchase = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request:MemberPurchaseInput },
  context: any,
  info: any,
):Promise<MemberPurchase> => {
  try {
    const { memberID, firstname, surname } = args.request;
    console.log("Query > getMemberPurchase > args.fields = ", args.request);
    await dbConnect();
    if (!memberID && !firstname && !surname) {
      throw new GraphQLError("You need to supply either firstname, surname or memberID");
   }
    let memberData: any
    let searchTerm: any = {};
    if ( memberID ) {
      searchTerm["memberID"] = memberID
    }
    if ( firstname ){
      const firstnamePattern = new RegExp(firstname, "i");
      searchTerm["firstname"] = { $regex: firstnamePattern }
    }
    if ( surname ){
      const surnamePattern = new RegExp(surname, "i");
      searchTerm["surname"] = { $regex: surnamePattern }
    }
  
    memberData = await Members.findOne(searchTerm).lean();

    if (!memberData){
      throw new GraphQLError("No member found");
    }
    
    const purchase = await BarSales.find({memberID: memberData.memberID}).sort({date: -1})
    
    let payments = []
    if ( memberData.payments?.length > 0 ){
     payments = memberData.payments.sort((a: any, b: any) => {
        return b.date - a.date;
      })
    }
    const purchaseData = {
        purchase,
        payments: payments,
        memberDetails: {
          memberID: memberData.memberID,
          title: memberData.title,
          firstname: memberData.firstname,
          surname: memberData.surname
        }
    }
    console.log("member purchase data => ", purchaseData);
    return purchaseData;
  } catch (err: any) {
    throw new GraphQLError("Query => getMemberPurchase =. Error: ", err.message);
  }
});

export default getMemberPurchase;
