import gql from 'graphql-tag';

export default gql.gql`
  # ---------- DrinksBank --------------
  type DrinksBank {
   _id: ID
   memberID: ID
   staffID: ID
   receivingStaff: Staff
   items: [ BeerBrandType ]
   drinksLeft: [ BeerBrandType ]
   collectedDates: [ DrinksCollector ]
   dateBanked: Date
   allDrinksCollected: Boolean
}

type DrinksCollector {
   staff: Staff,
   date: Date
   staffId: ID
}


  `