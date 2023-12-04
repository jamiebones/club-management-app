import { Members } from "../../../../models/MemberModel.js";
import { FindMemberInput, Member } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError } from 'graphql';


const findMember = async (
  parent: any,
  args: { request:FindMemberInput },
  context: any,
  info: any,
):Promise<Member> => {
  try {
    const { _id, memberID, firstname, surname } = args.request;
    console.log("Mutation > findMember > args.fields = ", args.request);
    if (!memberID && !_id && !firstname && !surname) {
      throw new GraphQLError("You need to supply either an _id, firstname, surname or memberID");
   }
    let memberData: any
    let searchTerm: any = {};
    if ( memberID ) {
      searchTerm["memberID"] = memberID
    }
    if ( firstname ){
      const firstnamePattern = new RegExp(firstname, "i");
      searchTerm["firstname"] = { $regex: firstnamePattern }
    }
    if ( surname ){
      const surnamePattern = new RegExp(surname, "i");
      searchTerm["surname"] = { $regex: surnamePattern }
    }
    
    if ( _id ) {
      searchTerm["_id"] = _id
    }
    memberData = await Members.findOne(searchTerm);
    console.log("searchTerm => ", searchTerm)
    if ( !memberData ){
      throw new GraphQLError("member data not found");
    }
      console.log("member data ", memberData)
      return memberData;
  } catch (err: any) {
    throw new GraphQLError("Member data not found");
  }
};

export default findMember;
