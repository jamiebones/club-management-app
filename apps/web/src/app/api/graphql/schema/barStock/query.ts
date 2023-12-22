
import  gql from "graphql-tag";

export default gql.gql`
  type Query {
    # ------- BarStock ------
    getStockSuppliedBySupplier(request: findBarStockInput!): [BarStock]
   
  }
`;

