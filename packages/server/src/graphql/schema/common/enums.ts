import gql from 'graphql-tag';

export default gql.gql`
    enum sexEnum {
    MALE
    FEMALE
}

enum paymentTypeEnum {
   CASH
   TRANSFER
   CREDIT
}
enum OrderField {
    memberID
    jobTitle
  }

  enum OrderDirection {
    ASC
    DESC
  }
`