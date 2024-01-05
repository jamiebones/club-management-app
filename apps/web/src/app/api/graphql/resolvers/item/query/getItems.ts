
import { Items } from "../../../../models/ItemModel";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";

const getItems = async (
  parent: any,
  args: { request: null },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    console.log("Query > getItems > args.fields = ", args.request);
    const items = await Items.find({ }).sort({name: 1}).lean();
    console.log("items ", items);
    return items;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => Item => getItems : ${err}` );
  }
  
};

export default getItems;
