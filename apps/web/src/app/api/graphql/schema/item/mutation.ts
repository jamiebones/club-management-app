import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- BarStock ------
    addItemToDB(request: addItemInput!): Item
   
  }
`;
