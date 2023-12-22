import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- Supplier ------
    addNewSupplier(request: addSupplierInput!): Supplier
    updateSupplier(request: updateSupplierInput!):Supplier
   
  }
`;