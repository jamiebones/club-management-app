import gql from 'graphql-tag';

export default gql.gql`
  # ---------- Donations --------------
  type Donation {
	   _id: ID
     donor: String!
     quantumDonated: Int!
     drinks: [ BeerBrandType ]
     date: Date
     saleType: saleTypeEnum
     seller: Seller
		}

  # ---------- Donations --------------
  type DonationUsage {
	   _id: ID
     drinks: [ BeerBrandType ]
     date: Date
     seller: Seller
		}

    type DonatedStock {
	   _id: ID
     brand: String
     quantity: Int
		}
  `

  