
import gql from "graphql-tag";

export default gql.gql`
  enum membershipTypeEnum {
     FULL
     ASSOCIATE
  }

  enum OrderableMemberField {
    _id
    jobTitle
    memberID
    birthDay
  }

  enum PaymentMethod {
      POS
      CASH
      BANK_TRANSFER
  },
`


