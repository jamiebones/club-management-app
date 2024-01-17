import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from '../../models/UserModel';
import { Members } from '../../models/MemberModel';
import { Staff } from '../../models/StaffModel';
import { Member, Staff as StaffType  } from '../../generated/graphqlStaffClub';
import dbConnect from '../../../../../lib/dbConnect';

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "example@example.com",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // Add your own logic here to find the user in database 
      // And validate the credentials  
      await dbConnect();
      let user = await User.findOne({username: credentials?.email });
      if (!user){
        throw new Error( JSON.stringify("The user does not exist"))
      }
      const result = await bcrypt.compare(credentials?.password!, user?.password);
      if (!result){
        throw new Error( JSON.stringify("The password is inorrect"))
      }
      
      if (user) {
        //saving the biodataID in the name variable to be used in the session callback
        //const member = await Members.findOne({_id: user.bioDataId});
        const [member, staff ] = await Promise.all([
            Members.findOne({_id: user.bioDataId}).lean(),
            Staff.findOne({_id: user.bioDataId}).lean()
        ]) as any
        let userObject: any = {}
        if (member){
          userObject.name = member?.firstname! || "";
        }

        if ( staff) {
          userObject.name = staff?.firstname;
        }
        
        userObject.role = user.role;
        userObject.email = user.username;
        //userObject.name = member?.firstname;
        userObject.id = user._id;
        userObject.bioDataId = user.bioDataId
        return Promise.resolve(userObject);
      } else {
        return Promise.resolve(null);
      }
    }
  })
],
callbacks: {
  async jwt({ token, user }) {
    /* Step 1: update the token based on the user object */
    if (user) {
      token.role = user.role;
      token.bioDataId = user.bioDataId;
      token.id = user.id;
    }
    // console.log("token ", token)
    return token;
  },
  session({ session, token }) {
    /* Step 2: update the session.user based on the token object */
    if (token && session.user) {
      session.user.role = token.role;
      session.user.bioDataId = token.bioDataId;
      session.user.id = token.id
    }
    // console.log("session =>", session)
    return session;
  },
  },
};


