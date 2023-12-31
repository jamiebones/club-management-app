
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
const AddStaffInput = gql`
  input addStaffInput {
    employeeID: ID!
    firstname: String!
    surname: String!
    jobTitle: String
    dateOfEmployment: Date
    nextOfKin: NextOfKinInput
    contact: [String]
    employmentType: employmentTypeEnum
    sex: sexEnum
    employmentStatus: employmentStatusEnum
    }
`

const NextOfKinInput = gql`
  input NextOfKinInput {
      name: String
      contact: [ String ]
    }
`

 
export {
    AddCreateUserInput,
    AddMemberInput,
    AddStaffInput
}