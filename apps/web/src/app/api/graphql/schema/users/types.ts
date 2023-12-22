import gql from 'graphql-tag';

export default gql.gql`
  # ---------- Users --------------
  type User {
  _id: ID!
  username: String
  password: String
  bioDataID: String
  userType: String
 }

  `