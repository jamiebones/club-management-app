
import  gql from "graphql-tag";

export default gql.gql`
  type Query {
    # ------- ITEM ------
     getItems: [Item!]
     getItemByName(request:getItemInput):Item
  }
`;

