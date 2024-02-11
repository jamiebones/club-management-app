import gql from 'graphql-tag';




export default gql.gql`
  # ---------- Member --------------
  type Member {
    _id: ID
    memberID: ID
    title: String
     firstname: String
     surname: String
		 email: String
     jobTitle: String
     nextOfKin: String
     contact: [String]
     membershipType: membershipTypeEnum
     employer: String
     sex: sexEnum
     birthDay: String
     sports: [String]
    dues: [DuesPayment]
    paymentReceived: [ Payment ]
    drinksBanked: [ DrinksBank ]
    drinksBought: [ BarSale ]
  }


  type FindMembersCursorOutput {
    members: [Member]
    pageInfo: PageInfo
  }
  
  union MemberResult = Member | NotFound
  
`