import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarStock --------------
  type Item {
     _id: ID
     name: String!
     sellingPrice: String!
     totalStock: Int!
     numberInCrate: Int!
 }
  `

