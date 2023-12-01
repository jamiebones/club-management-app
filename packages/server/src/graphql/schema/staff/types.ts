import gql from 'graphql-tag';
export default gql.gql`
  # ---------- Staff --------------
  type Staff {
   _id: ID!
   employeeID: ID
   name: String
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