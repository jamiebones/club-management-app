import gql from 'graphql-tag';

export default gql.gql`
  # ---------- Supplier --------------
  type Supplier {
  _id: ID
  name: String
  contact: [ String ]
  address: String
  #payment: [ Payment ]
  drinks: [ BarStock ]
  
}

  `