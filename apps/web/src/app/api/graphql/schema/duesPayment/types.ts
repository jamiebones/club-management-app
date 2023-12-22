import gql from 'graphql-tag';

export default gql.gql`
  # ---------- DuesPayment --------------
  type DuesPayment {
	 _id: ID
   memberID: ID
   member: Member
   amountPaid: String
   paymentFor: [ PaymentFor ]
   paymentType: paymentTypeEnum
   date: Date
}

type PaymentFor {
   month: String,
   year: String
}
`