import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarStock --------------
  type BarStock {
     supplierID: ID!
     Supplier: Supplier
     amount: String!
     saleType: paymentTypeEnum!
     itemsSupplied: [ ItemSupplied!]
     date: Date!
 }
  `