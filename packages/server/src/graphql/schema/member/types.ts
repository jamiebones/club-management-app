import gql from 'graphql-tag';




export default gql.gql`
  # ---------- Member --------------
  type Member {
    _id: ID
    memberID: ID!
    title: String
     firstname: String!
     surname: String!
		 email: String
     jobTitle: String
     nextOfKin: String
     contact: [String]
     membershipType: membershipTypeEnum
     employer: String
     sex: sexEnum
     birthDay: String
    #dues: [DuesPayment]
    #  paymentReceived: [ Payment ]
    #  drinksBanked: [ DrinksBanked ]
    #  drinksBought: [ BarSales]
  }


  type FindMembersCursorOutput {
    members: [Member]
    pageInfo: PageInfo
  }

  
`