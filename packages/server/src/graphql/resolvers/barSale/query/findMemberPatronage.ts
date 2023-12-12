import { BarSales } from "../../../../models/BarSaleModel.js";
import { Members } from "../../../../models/MemberModel.js";
import { FindMemberPatronageInput, BarSale as BarSaleType } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';



const findMemberPatronage = async (
  parent: any,
  args: { request: FindMemberPatronageInput },
  context: any,
  info: any,
) => {
  try {
    const { memberID, startDate, endDate, saleType, paymentType } = args.request;
    console.log("Query > findMemberPatronage > args.fields = ", args.request);
    if (! memberID ) {
      throw new GraphQLError("The supplier _id is a required field");
   }
   let fields: any = {
      "memberID": memberID
   }
    const member = await Members.findOne({_id: memberID});
    if (!member){
        throw new GraphQLError("The supplied ID is not a member")
    }

    if ( saleType ){
        fields.saleType = saleType
    }

    if ( paymentType ) {
        fields.paymentType = paymentType
    }

    if ( startDate && endDate ){
        fields.date = { $gte: startDate, $lte: endDate}
    }

    const patronage = await BarSales.find(fields).sort({date: 1}).lean();
    console.log("customer patronage ", patronage);
    return patronage;
  } catch (err: any) {
    throw new GraphQLError("Query => findMemberPatronage =. Error: ", err);
  }
};

export default findMemberPatronage;
