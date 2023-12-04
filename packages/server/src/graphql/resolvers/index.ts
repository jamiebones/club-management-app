
import members from "./members/index.js";
import memberMutation from "./members/mutation/index.js"
import memberQuery from "./members/query/index.js"



const resolvers = {
  Query: {
    ...memberQuery
  },
  Mutation: {
   ...memberMutation
    
  },
  ...members,
 
};

export default resolvers;
