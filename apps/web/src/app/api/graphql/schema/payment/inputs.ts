import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addPaymentInput {
    _id: ID
    receiverID: ID
    amountPaid: String
	paymentFor: String
    paymentCategory: paymentCategoryEnum
    date: Date
  }

  `