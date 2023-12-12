import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input newBarSaleInput {
     memberID: ID!
     staffID: ID!
     items: [ BeerBrandInput! ]
     amount: String!
     paymentType: paymentTypeEnum!
     saleType: saleTypeEnum!
  }

 
  `

