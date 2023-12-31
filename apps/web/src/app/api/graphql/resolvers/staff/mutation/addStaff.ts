import { Staff } from "../../../../models/StaffModel";
import { Staff as StaffData, AddStaffInput } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import dbConnect from "../../../../../../../lib/dbConnect";

const addStaff = async (
  parent: any,
  args: { request: AddStaffInput},
  context: any,
  info: any,
)=> {
  try {
    await dbConnect();
    const { contact, firstname, surname, employeeID,
    nextOfKin, jobTitle, employmentStatus, employmentType, dateOfEmployment, sex,  } = args.request;
    console.log("Mutation > addStaff > args.fields = ", args.request);
    const fields:StaffData = {
      employeeID,
      firstname,
      surname
    };
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
   const newStaff = await new Staff(fields).save();

   console.log("new staff data => ", newStaff)
    return newStaff;
  
  } catch (err: any) {
    throw new GraphQLError(`Error => Mutation => addStaff : ${err} `);
  }
};

export default addStaff;
