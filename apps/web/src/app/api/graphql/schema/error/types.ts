import gql from 'graphql-tag';


export default gql.gql`
  # ---------- Error --------------
  
interface BaseError {
    message: String!
  }
   
  type InvalidInputError implements BaseError {
    message: String!
  }
   
  type NotFoundError implements BaseError {
    message: String!
  }
   
  type UnknownError implements BaseError {
    message: String!
  }
   
  type NotAllowedError implements BaseError {
    message: String!
  }
  
`

