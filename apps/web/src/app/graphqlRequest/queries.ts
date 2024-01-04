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

const GetMembers = gql`
    query FindMembers($request: findMembersInput) {
    findMembers(request: $request) {
       members{
        _id
       firstname
       surname
    memberID,
    title,
    firstname,
    surname,
    jobTitle,
    nextOfKin,
    contact,
    email,
    membershipType,
    employer,
    sex,
    birthDay,
       }
   }
}
`

const GetSuppliers = gql`
  query getSuppliers {
    getSuppliers{
      _id
      name
    }
  }
`;

export {
    FindMember,
    FindStaff,
    GetMembers,
    GetSuppliers
}
