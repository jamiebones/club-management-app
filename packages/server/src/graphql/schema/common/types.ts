import gql from 'graphql-tag';

export default gql.gql`

type NextOfKin {
    name: String
    contact: [ String ]
}

type BeerBrandType {
   brand: String
   quantity: String
}

type ItemSupplied {
    brand: String
    quantity: String
    numberOfBottles: String
 }
`