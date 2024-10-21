import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarStock --------------
  type BarStock {
     _id: ID
     supplierID: ID!
     Supplier: Supplier
     amount: Int
    #  saleType: paymentTypeEnum!
     itemsSupplied: [ ItemSupplied!]
     date: Date
 }
  `