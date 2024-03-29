import { Members } from "../../../../models/MemberModel";
import { AddMemberInput, Member } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, allowAdministrativeTask } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const addMember = 
combineResolvers(
  IsAuthenticated,
  allowAdministrativeTask,
async (
  parent: any,
  args: { request: AddMemberInput },
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { contact, email, firstname, title, birthDay, surname,
    memberID, membershipType, sex, employer, nextOfKin, jobTitle, sports } = args.request;
    console.log("Mutation > addMember > args.fields = ", args.request);
    const fields:Member = {
      firstname,
      surname
    };
    if ( title ){
      fields.title = title;
    }
    if ( contact ){
      fields.contact = contact
    }
    if ( email){
      fields.email = email;
    }
    if ( birthDay ){
      fields.birthDay = birthDay;
    }
    if ( membershipType ){
      fields.membershipType = membershipType
    }
    if ( sex ){
      fields.sex = sex
    }
    if ( employer ){
      fields.employer = employer
    }

    if ( nextOfKin ){
      fields.nextOfKin = nextOfKin
    }

    if ( jobTitle){
      fields.jobTitle = jobTitle;
    }
    if ( sports ){
      fields.sports = sports;
    }

    if ( memberID ){
      fields.memberID = memberID;
    }

   const newMember = await new Members(fields).save();

   console.log("newmember data => ", newMember)
    return newMember;
  
  } catch (err: any) {
    throw new GraphQLError(err.message, {
        extensions: { code: 'YOUR_ERROR_CODE' },
    });
  }
});

export default addMember;
