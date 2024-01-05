
import { Items } from "../../../../models/ItemModel";
import { Item, GetItemInput } from "@/app/api/generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";

const getItemByName = async (
  parent: any,
  args: { request: GetItemInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { name } = args.request;
    console.log("Query > getItemsByName > args.fields = ", args.request);
    const itemNamePattern = new RegExp(name, "i");
    const item = await Items.findOne({name : { $regex: itemNamePattern } }).lean();
    console.log("item ", item);
    return item;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => Item => getItemByName : ${err}` );
  }
  
};

export default getItemByName;
