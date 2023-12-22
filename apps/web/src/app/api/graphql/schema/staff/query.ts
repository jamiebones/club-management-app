import  gql from "graphql-tag";


export default gql.gql`
  type Query {
    # Find one Staff
    findStaff(request: findStaffInput): StaffResult
  }
`