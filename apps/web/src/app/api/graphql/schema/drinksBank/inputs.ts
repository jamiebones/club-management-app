import gql from 'graphql-tag';

export default gql.gql`

 input addBankedDrinksInput {
   memberID: ID
   staffID: ID
   items: [ BeerBrandInput ]
   drinksLeft: [ BeerBrandInput ]
   dateBanked: Date
}

input collectBankedDrinksInput {
   drinksToCollect:  [ BeerBrandInput! ]
   memberID: ID!
   staffID: ID!
}

`


