import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from '../../models/UserModel';
import { Members } from '../../models/MemberModel';

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
        const member = await Members.findOne({_id: user.bioDataId});
        return Promise.resolve({...user, name: member?.firstname, email: user.username, image: `${user?.bioDataId}:${user?._id}`});
      } else {
        return Promise.resolve(null);
      }
    }
  })
],
callbacks: {
    session: async ({ session, token }) => {
      console.log("Session Callback token 2=>", token);
      const data = session.user?.image?.split(":");
      return {
        ...session,
        user: {
          ...session.user,
          image: null
        },
        bioDataId: data && data[0]!,
        id: data && data[1]
      };
    },
    // jwt: ({ token, user }) => {
    //   console.log("JWT Callback 1", { token, user });
    //   if (user) {
    //     const u = user as unknown as any;
    //     return {
    //       ...token,
    //       id: u._id,
    //     };
    //   }
    //   return token;
    // },
  },
};


