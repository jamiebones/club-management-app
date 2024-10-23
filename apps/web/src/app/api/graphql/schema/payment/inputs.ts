import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addPaymentInput {
    _id: ID
    receiverID: ID
    amountPaid: Int
	  paymentFor: String
    paymentCategory: paymentCategoryEnum
    date: Date
  }

  input getPaymentInput{
    receiverID: ID!
  }

  `