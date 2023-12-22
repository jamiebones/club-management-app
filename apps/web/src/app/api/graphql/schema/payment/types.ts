import gql from 'graphql-tag';

export default gql.gql`
  scalar Date
  # ---------- Payment --------------
  type Payment {
	 _id: ID
  receiverID: ID
  amountPaid: String
	paymentFor: String
  paymentCategory: paymentCategoryEnum
  date: Date
  receiver: ReceiverResult
}

union ReceiverResult = Staff | Member | Supplier

  `