
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
`


