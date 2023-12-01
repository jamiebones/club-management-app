import gql from 'graphql-tag';
const g = gql.default
export default gql.gql`
  # ---------- Member --------------
  type Member {
    memberID: ID!
    title: String
     name: String!
		 email: String
     jobTitle: String
     nextOfKin: String
     contact: [String]
     membershipType: membershipTypeEnum
     employer: String
     sex: sexEnum
     birthDay: String
    # dues: [DuesPayment]
    #  paymentReceived: [ Payment ]
    #  drinksBanked: [ DrinksBanked ]
    #  drinksBought: [ BarSales]
  }
`