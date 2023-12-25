import { User } from "../../../../models/UserModel";
import { Member } from "../../../../generated/graphqlStaffClub";
import { User as UserType, AddCreateUserInput} from "../../../../generated/graphqlStaffClub";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { GraphQLError } from 'graphql';
import { redirect } from 'next/navigation'

const createUserAccount = async (
  parent: any,
  args: { request: AddCreateUserInput},
  context: any,
  info: any,
) => {
  try {
      const {  } = args.request;
      const session = await getServerSession(options) as any
      if (!session) {
        //redirect the user the login route;
        throw new GraphQLError("You be logged-in to be able to perform this action")
      }
      //const { id} = session;
      console.log("Mutation > createUserAccount >> args.fields = ", args.request);
      const { bioDataId } = session;
      
   
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => createUserAccount : ${err} `);
  }
};

export default createUserAccount;
