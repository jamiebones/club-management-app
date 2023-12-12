
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
import barSaleMutation from "./barSale/mutation/index.js"



const resolvers = {
  Query: {
    ...memberQuery,
    ...staffQuery,
    ...barStockQuery

  },
  Mutation: {
   ...memberMutation,
   ...staffMutation,
   ...barStockMutation,
   ...supplierMutation,
   ...barSaleMutation
    
  },
  ...members,
  ...staff,
  ...barStock,
  ...supplier,
  ...barSale
 
};

export default resolvers;
