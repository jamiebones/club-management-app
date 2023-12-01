import  gql from "graphql-tag";


export default gql.gql`
  type Query {
    # Find one Member
    findMember(request: findMemberInput): Member
  }
`