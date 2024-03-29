import { Staff } from "../../../../models/StaffModel";
import { Staff as StaffData, UpdateStaffInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";
import { IsAuthenticated, allowAdministrativeTask} from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

const updateStaff = 
combineResolvers(
  IsAuthenticated,
  allowAdministrativeTask,
async (
  parent: any,
  args: { request: UpdateStaffInput},
  context: any,
  info: any,
) => {
  try {
    await dbConnect();
    const { contact, firstname, surname, employeeID, _id,
    nextOfKin, jobTitle, employmentStatus, employmentType, dateOfEmployment, sex,  } = args.request;
    console.log("Mutation > addStaff > args.fields = ", args.request);
    
    const fields: any = {};

    if (!_id) throw new GraphQLError("Please the _id is a required field");

    if ( contact ){
      fields.contact = contact;
    }
    if ( employmentStatus ){
      fields.employmentStatus = employmentStatus
    }
    if ( employmentType){
      fields.employmentType = employmentType;
    }
    if ( employmentStatus ){
      fields.employmentStatus = employmentStatus;
    }
    if ( dateOfEmployment){
      fields.dateOfEmployment = dateOfEmployment
    }
    if ( sex ){
      fields.sex = sex
    }

    if ( nextOfKin ){
      fields.nextOfKin = nextOfKin
    }

    if ( jobTitle){
      fields.jobTitle = jobTitle;
    }
    const staffData = await Staff.findOne({_id: _id});

   if (!staffData){
     throw new GraphQLError("Staff with that _id does not exist")
   }
   const updatedStaff = await Staff.findOneAndUpdate({_id : _id}, fields,  { new: true },)
   return updatedStaff;
  
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => updateStaff : ${err} `);
  }
});

export default updateStaff;
