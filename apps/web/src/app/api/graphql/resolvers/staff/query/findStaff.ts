import { Staff as StaffModel } from "../../../../models/StaffModel";
import { FindStaffInput, StaffResult } from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';


const findStaff = async (
  parent: any,
  args: { request:FindStaffInput },
  context: any,
  info: any,
):Promise<StaffResult> => {
  try {
    const { _id, employeeID, firstname, surname } = args.request;
    console.log("Mutation > findMember > args.fields = ", args.request);
    if (!employeeID && !_id && !firstname && !surname) {
      throw new GraphQLError("You need to supply either an _id, firstname, surname or employeeID");
   }
    let staffData: any
    let searchTerm: any = {};
    if ( employeeID ) {
      searchTerm["employeeID"] = employeeID
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
    staffData = await StaffModel.findOne(searchTerm).lean();
    console.log("searchTerm => ", searchTerm)
    if ( !staffData ){
      return {
        __typename: 'NotFound',
        message: "staff data not found"
      }
    }
    console.log("staff data ", staffData)
      return {...staffData,  __typename: 'Staff'};
  } catch (err: any) {
    throw new GraphQLError("Query => findStaff => ", err);
  }
};

export default findStaff;
