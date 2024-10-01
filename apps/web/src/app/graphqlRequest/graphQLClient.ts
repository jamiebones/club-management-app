import { GraphQLClient } from "graphql-request";


const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})


export default graphQLClient