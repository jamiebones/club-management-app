import  gql from "graphql-tag";

export default gql.gql`
  type Query {
    # -------DuesPayment------
     findMemberDuesPaid(request: findMemberDuesPaidInput!): [ DuesPayment ]
   
  }
`;