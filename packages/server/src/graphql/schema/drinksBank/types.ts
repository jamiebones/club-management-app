import gql from 'graphql-tag';

export default gql.gql`
  # ---------- DrinksBank --------------
  type DrinksBank {
   memberID: ID
   staffID: ID
  receivingStaff: Staff
  items: [ BeerBrandType ]
  drinksLeft: [ BeerBrandType ]
  collectedDates: [ DrinksCollector ]
  dateBanked: Date
   
}

type DrinksCollector {
   staff: Staff,
   date: Date
}

  `