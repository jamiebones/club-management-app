import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- BankedDrinks ------
     addDuesPayment(request: addDuesPaymentInput!): DuesPayment
   
  }
`;
