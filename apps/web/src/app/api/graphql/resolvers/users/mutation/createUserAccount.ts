import { User } from "../../../../models/UserModel";
import { RoleEnum } from "../../../../generated/graphqlStaffClub";
import { User as UserType, AddCreateUserInput} from "../../../../generated/graphqlStaffClub";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import bcrypt from "bcrypt";

const createUserAccount = async (
  parent: any,
  args: { request: AddCreateUserInput},
  context: any,
  info: any,
) => {
  try {
      const { username, password, role, bioDataId } = args.request;
      await dbConnect();
      const session = await getServerSession(options) as any
      if (!session) {
        //redirect the user the login route;
        throw new GraphQLError("You be logged-in to be able to perform this action")
      }
      console.log("Mutation > createUserAccount >> args.fields = ", args.request);
      const { user: { id } } = session;
      //check if the loggin user is an ADMIN;
      const isAdmin = await User.findOne({_id: id, role: "ADMIN"});

      if (!isAdmin){
        throw new GraphQLError("Only admin can create account");
      }
      //check if the fellow has an account alraedy
      const accountExists = await User.findOne({bioDataId: bioDataId});
      if (accountExists){
        throw new GraphQLError("You already have an account");
      }
      const hashedPassword = await bcrypt.hash(password!, 10);
      const newUser: UserType = {
        bioDataId: bioDataId,
        username: username,
        password: hashedPassword,
        role: role as RoleEnum
      }
      const user = await new User(newUser).save();
      return user;
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => createUserAccount : ${err} `);
  }
};

export default createUserAccount;
