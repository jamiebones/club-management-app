import { gql } from 'graphql-request';




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

const FindMemberFullDetails = gql`
  query FindMember($request: findMemberInput) {
    findMember(request: $request) {
      ... on Member {
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
      sports
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
    query FindMembers($request: findMembersInput, $orderBy: MemberOrderBy, $after: String, $before: String, $limit: Int) {
    findMembers(request: $request, orderBy: $orderBy, after: $after, before: $before, limit: $limit) 
    {
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
      sports
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

const GetItemByName = gql`
  query getItemByName($request: getItemInput!){
    getItemByName(request: $request){
      _id
      name
      sellingPrice
      numberInCrate
      totalStock
    }
  }
`;

const GetItems = gql`
  query getItems{
    getItems{
      _id
      name
      numberInCrate
    }
  }
`;



const GetMemberDetails = gql`
  query FindMember($request: findMemberInput) {
    findMember(request: $request) {
      ... on Member {
        surname
        firstname
        _id
        memberID
        title
        membershipType
      }
      ... on NotFound {
        message
      }
      
    }
  }
`;

const GetItemsForSale = gql`
  query getItems{
    getItems{
      _id
      name
      numberInCrate
      totalStock
      sellingPrice
    }
  }
`;



export {
    FindMember,
    FindStaff,
    GetMembers,
    GetSuppliers,
    GetItemByName,
    GetItems,
    GetMemberDetails,
    GetItemsForSale,
    FindMemberFullDetails
}
