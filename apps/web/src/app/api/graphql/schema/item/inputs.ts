import gql from "graphql-tag";

export default gql.gql`
  # ---------- Input --------------
  input addItemInput {
     name: String!
     sellingPrice: Int!
     totalStock: Int!
     numberInCrate: Int!
  }

  input getItemInput {
    name: String!
  }

  input updateItemInput {
    _id: ID!
    name: String!
    sellingPrice: Int!
    numberInCrate: Int!
  }
`
  