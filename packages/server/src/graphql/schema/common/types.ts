import gql from 'graphql-tag';

export default gql.gql`

type NextOfKin {
    name: String
    contact: [ String ]
}

type BeerBrandType {
   brand: String
   quantity: Int
}

type ItemSupplied {
    brand: String
    quantity: Int
    numberOfBottles: Int
 }

 type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    start: String
    end: String
  }

  type NotFound {
    message: String
  }


`