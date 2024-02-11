import gql from 'graphql-tag';

export default gql.gql`
  # ---------- BarSales --------------
  type BarSale {
	   _id: ID
     memberID: ID!
     staffID: ID!
		 customer: Member
     seller: Seller
     items: [ BeerBrandType ]
     date: Date
     amount: Int
     paymentType: paymentTypeEnum
     saleType: saleTypeEnum
		}

    union Seller = Staff | Member

    type BarSaleOutput {
      sales: [BarSale]
      stocks: [Item]
  }

  `