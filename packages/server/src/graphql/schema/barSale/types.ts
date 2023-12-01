import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarSales --------------
  type BarSale {
     
	   _id: ID!
     memberID: ID
     staffID: ID
		 customer: Member
     seller: Staff
     items: [ BeerBrandType ]
     date: Date
     amount: String
     paymentType: paymentTypeEnum
     saleType: saleTypeEnum
		}

  `