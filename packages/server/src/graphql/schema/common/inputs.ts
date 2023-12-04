
import gql from 'graphql-tag';

export default gql.gql`

input OrderBy {
    field: OrderField
    direction: OrderDirection
}
`

