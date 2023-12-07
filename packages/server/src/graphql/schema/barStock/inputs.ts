import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addBarStockInput {
     supplierID: ID!
     amount: String!
     saleType: paymentTypeEnum!
     itemsSupplied: [ ItemSuppliedInput! ]
     date: Date!
  }

  input findBarStockInput {
    _id: ID!
  }
  `