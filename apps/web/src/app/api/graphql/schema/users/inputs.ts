import gql from "graphql-tag";

export default gql.gql`
  # ---------- MUTATION - Functions --------------
  input addCreateUserInput {
    username: String
    password: String
    bioDataId: String
    role: roleEnum
  }
`
