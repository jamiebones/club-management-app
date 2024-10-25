import { gql } from 'graphql-request';



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

const UpdateMemberDetails = gql`
  mutation updateMember($request: updateMemberInput!) {
    updateMember(request: $request) {
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

const AddNewSupplier = gql`
  mutation addNewSupplier($request: addSupplierInput) {
    addNewSupplier(request: $request) {
      supplierID
      _id
    }
  }
`;

const AddNewItemToDB = gql`
  mutation addItemToDB($request: addItemInput!) {
    addItemToDB(request: $request) {
      _id
      name
    }
  }
`;

const UpdateItem = gql`
  mutation updateItem($request: updateItemInput!) {
    updateItem(request: $request) {
      _id
    }
  }
`;

const AddBarStock = gql`
  mutation addBarStock($request: addBarStockInput!) {
    addBarStock(request: $request) {
      _id
    }
  }
`;

const AddNewBarSale = gql`
  mutation newBarSale($request: newBarSaleInput!) {
    newBarSale(request: $request) {
      _id
    }
  }
`;

const SwapBeer = gql`
  mutation swapBeer($request: swapBeerInput!) {
    swapBeer(request: $request) 
  }
`;

const AddNewDonation = gql`
  mutation addNewDonation($request: newDonationInput!) {
    addNewDonation(request: $request) 
  }
`;

const BringOutDonation = gql`
  mutation bringOutDonation($request: bringOutBeerInput!) {
    bringOutDonation(request: $request) 
  }
`;

const MakeDrinksPaymentToSupplier = gql`
  mutation addPayment($request: addPaymentInput!) {
    addPayment(request: $request) {
      _id
    }
  }
`;

const MemberBarPayment = gql`
  mutation memberBarPayment($request: memberBarPaymentInput!) {
    memberBarPayment(request: $request) {
      _id
    }
  }
`;

//memberBarPayment



export {
    CreateUserAccount,
    CreateNewMemberAccount,
    CreateNewStaff,
    AddNewSupplier,
    AddNewItemToDB,
    UpdateItem,
    AddBarStock,
    UpdateMemberDetails,
    AddNewBarSale,
    SwapBeer,
    AddNewDonation,
    BringOutDonation,
    MakeDrinksPaymentToSupplier,
    MemberBarPayment
}