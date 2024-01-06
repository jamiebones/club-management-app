import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarStock --------------
  type Item {
     _id: ID
     name: String!
     sellingPrice: Int!
     totalStock: Int!
     numberInCrate: Int!
 }
  `

