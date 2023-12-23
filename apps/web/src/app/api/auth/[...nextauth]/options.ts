import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
  CredentialsProvider({
    name: "Sign in",
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
      const user = { id: '1', name: 'User', email: 'user@example.com' };
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.resolve(null);
      }
    }
  })
],
callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};



//use session in server-side

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   // Your code here
// }

