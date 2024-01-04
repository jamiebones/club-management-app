import  gql from "graphql-tag";


export default gql.gql`
  type Query {
    getSuppliers: [Supplier]
  }
`