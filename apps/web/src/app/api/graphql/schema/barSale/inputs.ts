import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input newBarSaleInput {
     memberID: ID!
     staffID: ID!
     items: [ BeerBrandInput! ]
     amount: Int!
   #   paymentType: paymentTypeEnum
   #   saleType: saleTypeEnum
  }

  input findMemberPatronageInput {
    memberID: ID!
    saleType: saleTypeEnum
    startDate: Date
    endDate: Date
    # paymentType: paymentTypeEnum
  }

  input findDrinksSaleByDateInput {
     startDate: Date
     endDate: Date
   #   paymentType: paymentTypeEnum
   #   saleType: saleTypeEnum
  }
 
  
 
  `

