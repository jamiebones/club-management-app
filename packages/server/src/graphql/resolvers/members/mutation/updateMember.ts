import { Members } from "../../../../models/MemberModel.js";
import { UpdateMemberInput, Member } from "../../../../generated/graphqlStaffClub.js";
import { GraphQLError, GraphQLString } from 'graphql';

const updateMember = async (
  parent: any,
  args: { request: UpdateMemberInput },
  context: any,
  info: any,
) => {
  try {
    const { contact, email, firstname, title, birthDay, surname, _id,
    memberID, membershipType, sex, employer, nextOfKin, jobTitle  } = args.request;
    console.log("Mutation > updateMember > args.fields = ", args.request);

    const fields: any = {};

    if (!_id) throw new GraphQLError("Please the _id is a required field");

    if ( memberID){
        fields.memberID = memberID;
    }
    if ( firstname ) {
        fields.firstname = firstname;
    }
    if ( surname) {
        fields.surname = surname
    }
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

   const memberData = await Members.findOne({_id: _id});

   if (!memberData){
     throw new GraphQLError("Member with that _id does not exist")
   }
   const updatedMember = await Members.findOneAndUpdate({_id : _id}, fields,  { new: true },)
    return updatedMember;
  
  } catch (err: any) {
    throw new GraphQLError(err.message, {
        extensions: { code: 'Mutation -> updateMember' },
    });
  }
};

export default updateMember;
