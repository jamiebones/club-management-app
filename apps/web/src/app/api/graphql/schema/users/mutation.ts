
import gql from 'graphql-tag';

export default gql.gql`
  type Mutation {
    # ------- User ------
    createUserAccount(request: addCreateUserInput!): User
    #deleteUserAccount(request: updateSupplierInput!):Supplier
   
  }

  `