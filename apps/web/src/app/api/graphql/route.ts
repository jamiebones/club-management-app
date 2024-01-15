import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import {getToken} from "next-auth/jwt"
import typeDefs from "./schema";
import resolvers from "./resolvers";


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req: NextRequest) => {
        const token = await getToken({req})
        return {req, token}
    }
});

export { handler as GET, handler as POST };