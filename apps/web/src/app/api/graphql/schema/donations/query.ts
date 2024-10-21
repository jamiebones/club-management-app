

import  gql from "graphql-tag";

export default gql.gql`
  type Query {
    # ------- Donations ------
    getDonationsBetweenTwoDate(request: getDonationsBetweenTwoDateInput!): [DonationUsage]
    getDonationStockAvailable: [DonatedStock]
   
  }
`;


//