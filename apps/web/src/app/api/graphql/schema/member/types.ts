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
     payments: [MemberDrinkPayment]
  }

  type MemberDrinkPayment {
    amount: Int
    date: Date
    collectedBy: String
    paymentMethod: String
  }

  type FindMembersCursorOutput {
    members: [Member]
    pageInfo: PageInfo
  }

  type MemberPurchase {
    purchase: [BarSale]
    payments: [MemberDrinkPayment]
    memberDetails: MemberDetails
  }

  type MemberDetails {
    memberID: ID
    title: String
    firstname: String
    surname: String
  }
  
  union MemberResult = Member | NotFound
  
`