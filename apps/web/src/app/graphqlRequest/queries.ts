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

const GetSuppliersDetails = gql`
  query getSuppliers {
    getSuppliers{
      _id
      name
      contact
      address
    }
  }
`;

// name: 'Johnshon Freaky',
// web:dev:     contact: [ '858585885858', '08064774784', '08595900333' ],
// web:dev:     address: 'East West Avenue',

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

const GetBarSaleData = gql`
    query findDrinksSaleByDate($request: findDrinksSaleByDateInput!) {
      findDrinksSaleByDate(request: $request){
          sales{
            memberID
            staffID
		        customer{
              title
              firstname
              surname
            }
            seller{
              ... on Member {
                title
                firstname
                surname
              }
              ... on Staff {
                 firstname
                 surname
              }
            }
            items{
              brand
              quantity
            }
            date
            amount
            paymentType
            saleType
          }
          stocks{
            totalStock
            name
            _id
          }
      }
    }
`

const SearchMemberQuery = gql`
  query SearchMember($request: searchMemberInput) {
    searchMember(request: $request) {
      _id
      memberID,
      title,
      firstname,
      surname
    }
  }
`;

const GetMemberFullDetails = gql`
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
      dues{
        amountPaid
        paymentFor{
          month
          year
        }
        paymentType
        date
      },
      paymentReceived{
        amountPaid
	      paymentFor
        paymentCategory
        date
      },
      drinksBanked{
        receivingStaff{
          firstname
          surname
        }
        items{
          brand
          quantity
        }
        drinksLeft{
          brand
          quantity
        }
        collectedDates{
          staff{
            firstname
            surname
          }
          date
        }
        dateBanked
        allDrinksCollected
      },
      drinksBought{
        items{
          brand
          quantity
        }
        date
        amount
        paymentType
        saleType
       }
      }
      ... on NotFound {
        message
      }
      
    }
  }
`;

const GetDonationStockAvailable = gql`
  query GetDonationStockAvailable {
    getDonationStockAvailable{
      _id
      brand
      quantity
    }
  }
`;

//

const GetDonationsBetweenTwoDate = gql`
  query getDonationsBetweenTwoDate($request: getDonationsBetweenTwoDateInput!) {
    getDonationsBetweenTwoDate(request: $request) {
      _id
      drinks{
        brand
        quantity
      }
      date
      seller{
        ... on Member {
            firstname
            surname
         }
        ... on Staff {
            firstname
            surname
          }
        }
    }
  }
`;

const GetPaymentMadeToPerson = gql`
  query getPaymentMadeToPerson($request: getPaymentInput!) {
    getPaymentMadeToPerson(request: $request) {
      _id
      amountPaid
      paymentFor
      paymentCategory
      date
      receiver{
        ... on Member {
            firstname
            surname
         }
        ... on Staff {
            firstname
            surname
          }
          ... on Supplier {
            name
          }
        }
    }
  }
`;



const GetStockSuppliedBySupplier = gql`
  query getStockSuppliedBySupplier($request: findBarStockInput!)  {
    getStockSuppliedBySupplier(request: $request){
      _id
     amount
     itemsSupplied{
        brand
        quantity
        numberOfBottles
     }
     date
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
    FindMemberFullDetails,
    GetBarSaleData,
    SearchMemberQuery,
    GetMemberFullDetails,
    GetDonationStockAvailable,
    GetDonationsBetweenTwoDate,
    GetStockSuppliedBySupplier,
    GetSuppliersDetails,
    GetPaymentMadeToPerson
}
