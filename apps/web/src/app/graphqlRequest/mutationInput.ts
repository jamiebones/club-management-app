
import { gql } from 'graphql-request';

const RoleEnum = gql`
      enum roleEnum {
        SALES
        PRESIDENT  
        BARSECRETARY
        TREASURER
        SECRETARY
        ADMIN
}
`

const AddCreateUserInput = gql`
    input addCreateUserInput {
        username: String
        password: String
        bioDataId: String
        role: roleEnum
    }`

export {
    AddCreateUserInput
}