import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Payment ------
    addPayment(request: addPaymentInput!): Payment
  }
`;
