
import members from "./members/index.js";
import memberMutation from "./members/mutation/index.js"
import memberQuery from "./members/query/index.js"

import staff from "./staff/index.js"
import staffMutation from "./staff/mutation/index.js"
import staffQuery from "./staff/query/index.js"



const resolvers = {
  Query: {
    ...memberQuery,
    ...staffQuery
  },
  Mutation: {
   ...memberMutation,
   ...staffMutation
    
  },
  ...members,
  ...staff
 
};

export default resolvers;
