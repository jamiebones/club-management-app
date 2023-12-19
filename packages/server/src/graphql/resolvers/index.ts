
import members from "./members/index.js";
import memberMutation from "./members/mutation/index.js"
import memberQuery from "./members/query/index.js"

import staff from "./staff/index.js"
import staffMutation from "./staff/mutation/index.js"
import staffQuery from "./staff/query/index.js"

import barStock from "./barStock/index.js";
import barStockMutation from "./barStock/mutation/index.js";
import barStockQuery from "./barStock/query/index.js"

import supplier from "./supplier/index.js";
import supplierMutation from "./supplier/mutation/index.js"

import barSale from "./barSale/index.js";
import barSaleMutation from "./barSale/mutation/index.js";
import barSaleQuery from "./barSale/query/index.js"

import drinksBank from "./drinksBank/index.js";
import drinksBankMutation from "./drinksBank/mutation/index.js";

import payment from "./payment/index.js";
import paymentMutation from "./payment/mutation/index.js";

import duesPayment from "./duesPayment/index.js";
import duesPaymentMutation from "./duesPayment/mutation/index.js";
import duesPaymentQuery from "./duesPayment/query/index.js"


const resolvers = {
  Query: {
    ...memberQuery,
    ...staffQuery,
    ...barStockQuery,
    ...barSaleQuery,
    ...duesPaymentQuery

  },
  Mutation: {
   ...memberMutation,
   ...staffMutation,
   ...barStockMutation,
   ...supplierMutation,
   ...barSaleMutation,
   ...drinksBankMutation,
   ...paymentMutation,
   ...duesPaymentMutation
    
  },
  ...members,
  ...staff,
  ...barStock,
  ...supplier,
  ...barSale,
  ...drinksBank,
  ...payment,
  ...duesPayment

};

export default resolvers;
