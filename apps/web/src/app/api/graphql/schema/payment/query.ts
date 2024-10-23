import  gql from "graphql-tag";


export default gql.gql`
  type Query {
    # get payment made to a person
    getPaymentMadeToPerson(request: getPaymentInput!): [Payment]
   
  
  }
`