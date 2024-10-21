import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input getDonationsBetweenTwoDateInput {
     startDate: Date
     endDate: Date
  }

  input newDonationInput {
     drinks: [ BeerBrandInput! ]
  }

  input bringOutBeerInput {
    drinks: [ BeerBrandInput ]
  }
 

  `

