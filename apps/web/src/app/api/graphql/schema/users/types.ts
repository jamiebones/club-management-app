import gql from 'graphql-tag';

export default gql.gql`
  # ---------- Users --------------
  type User {
    _id: ID
    username: String
    password: String
    bioDataID: String
    role: roleEnum
    bio: Bio
 }


 union Bio = Member | Staff

  `