import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Item ------
    addItemToDB(request: addItemInput!): Item
    updateItem(request: updateItemInput!): Item
  }
`;
