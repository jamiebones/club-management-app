
import members from "./members/index.js";
import addMember from "./members/mutation/addMember.js";
import findMember from "./members/query/findMember.js"



const resolvers = {
  Query: {
    ...findMember
  },
  Mutation: {
   ...addMember
    
  },
  ...members,
 
};

export default resolvers;
