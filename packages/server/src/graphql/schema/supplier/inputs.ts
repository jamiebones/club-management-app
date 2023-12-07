import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addSupplierInput {
    supplierID: ID
    name: String
    contact: [ String ]
    address: String
  }
`