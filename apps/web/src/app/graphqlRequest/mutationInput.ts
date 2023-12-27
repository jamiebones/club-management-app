
import { gql } from 'graphql-request';

const RoleEnum = gql`
      enum roleEnum {
        SALES
        PRESIDENT  
        BARSECRETARY
        TREASURER
        SECRETARY
        ADMIN
}
`

const SexEnum = gql`
      enum sexEnum {
        MALE
        FEMALE
}
`

const MembershipTypeEnum = gql`
      enum membershipTypeEnum {
      FULL
      ASSOCIATE
}
`



const AddCreateUserInput = gql`
    input addCreateUserInput {
        username: String
        password: String
        bioDataId: String
        role: roleEnum
    }`

const AddMemberInput  = gql`
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
`



export {
    AddCreateUserInput,
    AddMemberInput
}