import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
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

  input NextOfKinInput {
    name: String
    contact: [ String ]
  }

input updateStaffInput {
   _id: ID!
   employeeID: ID
   firstname: String
   surname: String
   jobTitle: String
   dateOfEmployment: Date
   nextOfKin: NextOfKinInput
   contact: [String]
   employmentType: employmentTypeEnum
   sex: sexEnum
   employmentStatus: employmentStatusEnum
  }
`