import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Staff ------
    addStaff(request: addStaffInput!): Staff
    updateStaff(request: updateStaffInput!):Staff
   
  }
`;