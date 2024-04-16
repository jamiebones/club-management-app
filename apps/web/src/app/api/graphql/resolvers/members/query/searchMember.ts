import { Members } from "../../../../models/MemberModel";
import { FindMemberInput, Member } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { allAllowed, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";



const searchMember = 
combineResolvers(
  IsAuthenticated,
  allAllowed,
async (
  parent: any,
  args: { request:FindMemberInput },
  context: any,
  info: any,
):Promise<Member> => {
  try {
    await dbConnect();
    const { memberID, firstname, surname } = args.request;
    console.log("Query > searchMember > args.fields = ", args.request);
    if (!memberID && !firstname && !surname) {
      throw new GraphQLError("You need to supply either a firstname, surname or memberID");
   }
    let memberData: any
    let searchTerm: any = {};
    if ( memberID ) {
      const memberIDPattern = new RegExp(memberID, "i")
      searchTerm["memberID"] = {$regex: memberIDPattern }
    }
    if ( firstname ){
      const firstnamePattern = new RegExp(firstname, "i");
      searchTerm["firstname"] = { $regex: firstnamePattern }
    }
    if ( surname ){
      const surnamePattern = new RegExp(surname, "i");
      searchTerm["surname"] = { $regex: surnamePattern }
    }
    
    memberData = await Members.find(searchTerm).lean();
    console.log("Member searchTerm => ", searchTerm)
    if ( !memberData ){
      return <Member>[]
    }
      console.log("member data ", memberData)
      return memberData
  } catch (err: any) {
    console.error("Query => searchMember Error ", err)
    throw new GraphQLError("Query => searchMember Error", err);
  }
});

export default searchMember;
