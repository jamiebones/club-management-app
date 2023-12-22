import { BarSales } from "../../../../models/BarSaleModel";
import { Members } from "../../../../models/MemberModel";
import { Staff } from "../../../../models/StaffModel";
import { BarSale as BarSaleType, NewBarSaleInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';

const newBarSale = async (
  parent: any,
  args: { request: NewBarSaleInput },
  context: any,
  info: any,
)=> {
  try {
    const { memberID, staffID, items,
        amount,
        paymentType,
        saleType } = args.request;
    console.log("Mutation > newBarSale > args.fields = ", args.request);
    const fields: BarSaleType = {
      memberID,
      staffID,
      items,
      amount,
      paymentType,
      saleType,
      date: new Date()
    };
  const [ member, staff ] = await Promise.all([
    Members.findOne({_id: memberID}),
    Staff.findOne({_id: staffID})
  ]);

  if (!staff){
    throw new GraphQLError("The supplied staffID is not a valid one");
  }

  if (!member){
    throw new GraphQLError("The supplied memberID is not a valid one");
  }

  const newSale = await new BarSales(fields).save();
  console.log("new bar sales, => ", newSale);
  return newSale;

  } catch (err: any) {
    throw new GraphQLError(`Mutation => BarSale => newBarSale: ${err}` );
  }
};

export default newBarSale;
