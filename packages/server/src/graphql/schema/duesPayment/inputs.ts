import gql from 'graphql-tag';

export default gql.gql`
 input addDuesPaymentInput {
   memberID: ID
   amountPaid: String
   paymentFor: [ PaymentForInput ]
   paymentType: paymentTypeEnum
   date: Date
}

input PaymentForInput {
   month: String,
   year: String
}
`