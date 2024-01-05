import gql from "graphql-tag";

export default gql.gql`
  # ---------- Input --------------
  input addItemInput {
     name: String!
     sellingPrice: String!
     totalStock: Int!
     numberInCrate: Int!
  }

  input getItemInput {
    name: String!
  }
`
  