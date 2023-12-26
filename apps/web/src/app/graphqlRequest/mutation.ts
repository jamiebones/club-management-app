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

export {
    CreateUserAccount
}