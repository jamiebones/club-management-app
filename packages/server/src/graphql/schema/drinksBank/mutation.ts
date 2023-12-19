import  gql from "graphql-tag";

export default gql.gql`
  type Mutation {
    # ------- BankedDrinks ------
     addBankedDrinks(request: addBankedDrinksInput!): DrinksBank
     collectBankedDrinks(request: collectBankedDrinksInput! ): DrinksBank
   
  }
`;
