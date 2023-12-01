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
`