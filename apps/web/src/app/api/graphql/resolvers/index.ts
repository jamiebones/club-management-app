
import members from "./members";
import memberMutation from "./members/mutation"
import memberQuery from "./members/query"

import staff from "./staff/index"
import staffMutation from "./staff/mutation"
import staffQuery from "./staff/query"

import barStock from "./barStock";
import barStockMutation from "./barStock/mutation";
import barStockQuery from "./barStock/query"

import supplier from "./supplier";
import supplierMutation from "./supplier/mutation";
import supplierQuery from "./supplier/query";

import barSale from "./barSale";
import barSaleMutation from "./barSale/mutation";
import barSaleQuery from "./barSale/query"

import drinksBank from "./drinksBank";
import drinksBankMutation from "./drinksBank/mutation";

import payment from "./payment";
import paymentMutation from "./payment/mutation";

import duesPayment from "./duesPayment";
import duesPaymentMutation from "./duesPayment/mutation";
import duesPaymentQuery from "./duesPayment/query"

import users from "./users";
import usersMutation from "./users/mutation"

import item from "./item";
import itemMutation from "./item/mutation";
import itemQuery from "./item/query";


const resolvers = {
  Query: {
    ...memberQuery,
    ...staffQuery,
    ...barStockQuery,
    ...barSaleQuery,
    ...duesPaymentQuery,
    ...supplierQuery,
    ...itemQuery

  },
  Mutation: {
   ...memberMutation,
   ...staffMutation,
   ...barStockMutation,
   ...supplierMutation,
   ...barSaleMutation,
   ...drinksBankMutation,
   ...paymentMutation,
   ...duesPaymentMutation,
   ...usersMutation,
   ...itemMutation
    
  },
  ...members,
  ...staff,
  ...barStock,
  ...supplier,
  ...barSale,
  ...drinksBank,
  ...payment,
  ...duesPayment,
  ...users,
  ...item

};

export default resolvers;
