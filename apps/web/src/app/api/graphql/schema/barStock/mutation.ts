import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- BarStock ------
    addBarStock(request: addBarStockInput!): BarStock,
   
  }
`;
