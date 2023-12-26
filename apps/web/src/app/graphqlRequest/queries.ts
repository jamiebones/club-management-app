import { gql } from 'graphql-request';
import "./queriesInput"



const FindMember = gql`
  query FindMember($request: findMemberInput) {
    findMember(request: $request) {
      ... on Member {
        surname
        firstname
        _id
      }
      ... on NotFound {
        message
      }
      
    }
  }
`;

const FindStaff = gql`
    query FindStaff($request: findStaffInput) {
    findStaff(request: $request) {
        ... on Staff {
        _id
        firstname
        surname
        }
        ... on NotFound {
        message
        }
   }
}


`

export {
    FindMember,
    FindStaff
}
