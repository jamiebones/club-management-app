
import gql from 'graphql-tag';

export default gql.gql`

input OrderBy {
    field: OrderField
    direction: OrderDirection
}

input ItemSuppliedInput {
    brand: String
    quantity: String
    numberOfBottles: String
 }

 input BeerBrandInput {
   brand: String
   quantity: String
}


`

