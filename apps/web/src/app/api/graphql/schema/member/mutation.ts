import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Member ------
    updateMember(request: updateMemberInput!): Member
    addMember(request: addMemberInput!): Member
    memberBarPayment(request: memberBarPaymentInput! ): Member
   
  }
`;
