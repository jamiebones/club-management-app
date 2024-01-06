import { Items } from "../../../../models/ItemModel";
import { UpdateItemInput, Item} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";

const updateItem = async (
  parent: any,
  args: { request: UpdateItemInput},
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
   const { name, numberInCrate, sellingPrice, _id } = args.request;
    console.log("Mutation > updateItem > args.fields = ", args.request);
    const fields = {
      name, numberInCrate, sellingPrice, 
    };
    const item = await Items.findOneAndUpdate({_id: _id}, {$set: {...fields}}, {new: true});
    console.log("updated item ", item);
    return item;
  } catch (err: any) {
    throw new GraphQLError(`Mutation => Item => updateItem : ${err}` );
  }
  
};

export default updateItem;
