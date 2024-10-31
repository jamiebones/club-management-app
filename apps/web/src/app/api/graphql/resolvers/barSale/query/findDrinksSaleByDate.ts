import { BarSales } from "@/app/api/models/BarSaleModel";
import { Items } from "@/app/api/models/ItemModel";
import { FindDrinksSaleByDateInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import { IsAuthenticated, allAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import dbConnect from "../../../../../../../lib/dbConnect";



const findDrinksSaleByDate = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request: FindDrinksSaleByDateInput },
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const { startDate, endDate } = args.request;
    console.log("Query > findMemberPatronage > args.fields = ", args.request);
   if ( !startDate && !endDate) {
    throw new GraphQLError('A parameter is needed')
   }
   let fields: any = {}
   const start = new Date(startDate.split('T')[0]).setHours(0, 0, 0, 0);
   const end = new Date(endDate.split('T')[0]).setHours(23, 59, 59, 999);

    fields = {date: { $gte: start, $lte: end}}

    // if ( paymentType ) {
    //     fields = {$and: [{date: { $gte: startDate, $lte: endDate}},  {paymentType: paymentType} ]}
    // }

    // if ( saleType ){
    //   fields = {$and: [{date: { $gte: startDate, $lte: endDate}},  
    //                    {paymentType: paymentType}, 
    //                    {saleType: saleType}]}
    // }

  //   if ( saleType && paymentType){
  //     fields = {$and: [ {
  //       date: { $gte: startDate, $lte: endDate}
  //     },
  //     { saleType: saleType },
  //     {paymentType: paymentType}
  //   ]
  //   }
  // }

    const [ sales, stocks ] = await Promise.all([
        BarSales.find({...fields}).sort({date: 1}).lean(),
        Items.find({}).lean()
    ])
    //console.log("bar sales over a period ", sales);
    return {
        sales,
        stocks
    }

  } catch (err: any) {
    throw new GraphQLError("Query => findDrinksSaleByDate =. Error: ", err);
  }
});

export default findDrinksSaleByDate;
