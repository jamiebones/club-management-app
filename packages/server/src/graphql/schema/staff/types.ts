import gql from 'graphql-tag';
export default gql.gql`
  # ---------- Staff --------------
  type Staff {
   _id: ID
   employeeID: ID!
   firstname: String!
   surname: String!
   jobTitle: String
   dateOfEmployment: Date
   nextOfKin: NextOfKin
   contact: [String]
   employmentType: employmentTypeEnum
   sex: sexEnum
   employmentStatus: employmentStatusEnum
   salary: [ Payment ]
 }

  `