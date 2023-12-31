import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addMemberInput {
     memberID: ID!
     title: String
     firstname: String!
     surname: String!
	  email: String
     jobTitle: String
     nextOfKin: String
     contact: [String]
     membershipType: membershipTypeEnum
     employer: String
     sex: sexEnum
     birthDay: String
  }

  input updateMemberInput {
     _id: ID!
     memberID: ID
     title: String
     firstname: String
     surname: String
	  email: String
     jobTitle: String
     nextOfKin: String
     contact: [String]
     membershipType: membershipTypeEnum
     employer: String
     sex: sexEnum
     birthDay: String
  }


  #--------------- Query Inputs ----------------------------#

  input findMemberInput{
     _id: String
     memberID: String
     firstname: String
     surname: String
  }

  input findMembersInput{
     _id: [String]
     jobTitle: [String]
     memberType: String
  }

  input MemberOrderBy {
    field: OrderableMemberField
    direction: OrderDirection
  }

`