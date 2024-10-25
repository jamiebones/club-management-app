import { BarSales } from "../../../../models/BarSaleModel";
import { Members }  from "../../../../models/MemberModel";
import { GraphQLError } from 'graphql';
import { IsAuthenticated, allAllowed } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";
import dbConnect from "../../../../../../../lib/dbConnect";



const getBarDebtors = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request: null },
  context: any,
  info: any,
) => {
    
    try {
        await dbConnect();
        // Step 1: Aggregate `barSaleSchema` by `memberID` with a sum on `amount`
        console.log("getting list of debtors ")
        const barSalesAggregation = await BarSales.aggregate([
          {
            $group: {
              _id: "$memberID",
              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $match: {
              totalAmount: { $gt: 0 },
            },
          },
        ]);

        
    
        // Step 2: Loop through each result and query `memberSchema`
        const results = await Promise.all(
          barSalesAggregation.map(async (barSale) => {
            const member = await Members.findOne({ memberID: barSale._id });
            if (member) {
              // Sum payments for each member
              let totalPayments = 0
              for (let i=0; i < member.payments.length || 0; i++){
                let item = member.payments[i];
                totalPayments += item?.amount
              }
              console.log("Total amount:", +barSale.totalAmount, +totalPayments)
              if (+barSale.totalAmount > +totalPayments){
                return {
                    memberID: barSale._id,
                    amount: barSale.totalAmount,
                    payment: totalPayments,
                    name: `${member.title} ${member.firstname} ${member.surname}`,
                    debt: +barSale.totalAmount  - +totalPayments
                  };
              } else{
                return null;
              }
              // Return formatted result
            }
            return null;
          })
        );

        console.log("sales result ", results)
        // Filter out any null results
        return results.filter((result) => result !== null);

  } catch (err: any) {
    throw new GraphQLError("Query => getBarDebtors =. Error: ", err);
  }
});

export default getBarDebtors;
