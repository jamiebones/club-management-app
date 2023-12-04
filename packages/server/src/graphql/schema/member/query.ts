import  gql from "graphql-tag";


export default gql.gql`
  type Query {
    # Find one Member
    findMember(request: findMemberInput): Member

    # Find Members list
    findMembers(
      request: findMembersInput
      orderBy: MemberOrderBy
      after: String
      before: String
      limit: Int
    ): FindMembersCursorOutput
  }
`