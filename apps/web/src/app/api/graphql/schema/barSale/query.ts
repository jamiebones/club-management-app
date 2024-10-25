

import  gql from "graphql-tag";

export default gql.gql`
  type Query {
    # ------- BarStock ------
    findMemberPatronage(request: findMemberPatronageInput!): [BarSale]
    findDrinksSaleByDate(request: findDrinksSaleByDateInput!): BarSaleOutput
    getBarDebtors:[BarDebtors]
   
  }
`;


//