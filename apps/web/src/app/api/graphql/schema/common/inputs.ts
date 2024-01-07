
import gql from 'graphql-tag';

export default gql.gql`

input OrderBy {
    field: OrderField
    direction: OrderDirection
}

input ItemSuppliedInput {
    brand: String
    quantity: Int
    numberOfBottles: Int
    _id: ID!
 }

 input BeerBrandInput {
   brand: String
   quantity: Int
}


`

