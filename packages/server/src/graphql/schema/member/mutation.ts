import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Member ------
    addMember(request: addMemberInput!): Member

    #updateMember(request: updateMemberInput!): Member
  }
`;
