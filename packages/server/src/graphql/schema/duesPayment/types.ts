import gql from 'graphql-tag';

export default gql.gql`
  # ---------- DuesPayment --------------
  type DuesPayment {
	 _id: ID!
   memberID: String
   member: Member
   amountPaid: String
   paymentFor: String
   paymentPurpose: paymentCategoryEnum
   date: Date
}

  `