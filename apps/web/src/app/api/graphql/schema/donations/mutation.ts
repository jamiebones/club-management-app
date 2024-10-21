import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Donation ------
    addNewDonation(request: newDonationInput!): Int
    bringOutDonation(request: bringOutBeerInput!): Int
    
  }
`;
