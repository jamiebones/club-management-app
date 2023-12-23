import gql from 'graphql-tag';

export default gql.gql`
    enum roleEnum {
        SALES
        PRESIDENT  
        BARSECRETARY
        TREASURER
        SECRETARY
        ADMIN
}
`