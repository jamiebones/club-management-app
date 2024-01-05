import { Items } from "../../../../models/ItemModel";
import { AddItemInput, Item} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';

const addItemToDB = async (
  parent: any,
  args: { request: AddItemInput},
  context: any,
  info: any,
)=> {
  try {
   const { name, numberInCrate, sellingPrice, totalStock  } = args.request;
    console.log("Mutation > addItemToDB > args.fields = ", args.request);
    const fields: Item = {
      name, numberInCrate, sellingPrice, totalStock 
    };
  
    const itemNamePattern = new RegExp(name, "i");
    const item = await Items.findOne({name : { $regex: itemNamePattern } });
    if (item){
        return item
    }
    const newItem = await new Items(fields).save();
    console.log("new item ", newItem);
    return newItem;

  } catch (err: any) {
    throw new GraphQLError(`Mutation => Item => addItemToDB: ${err}` );
  }
  
};

export default addItemToDB;
