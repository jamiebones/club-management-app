import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- BarStock ------
    newBarSale(request: newBarSaleInput!): BarSale,
   
  }
`;
