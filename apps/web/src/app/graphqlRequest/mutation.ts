import { gql } from 'graphql-request';
import "./mutationInput"



const CreateUserAccount = gql`
  mutation CreateUserAccount($request: addCreateUserInput!) {
    createUserAccount(request: $request) {
      _id
      username
    }
  }
`;

const CreateNewMemberAccount = gql`
  mutation addMember($request: addMemberInput!) {
    addMember(request: $request) {
      _id
      memberID
    }
  }
`;

const CreateNewStaff = gql`
  mutation addStaff($request: addStaffInput!) {
    addStaff(request: $request) {
      _id
      employeeID
    }
  }
`;

export {
    CreateUserAccount,
    CreateNewMemberAccount,
    CreateNewStaff
}