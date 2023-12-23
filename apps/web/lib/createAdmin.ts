import dbConnect from "./dbConnect";
import { Members } from "../src/app/api/models/MemberModel";
import { Member, MembershipTypeEnum, RoleEnum, SexEnum } from "@/app/api/generated/graphqlStaffClub";
import { User } from "@/app/api/models/UserModel";
import { User as UserType } from "@/app/api/generated/graphqlStaffClub";
import bcrypt from "bcrypt";


const createAdmin = async function() {
    //wait the connection here
    await dbConnect();
    //check if we have a member james
    const member = await Members.findOne({email: "jamiebones147@gmail.com"});
    if ( member ){
        return "Admin already exists"
    }
   //else create a new member and add user data
   console.log("saving admin member details");
   let newMember = {
       memberID: "UU/SSC/277",
       firstname: "James",
       surname: "Oshomah",
       birthDay: "1-05",
       membershipType: "FULL",
       contact: ["08063348352"],
       email: "jamiebones147@gmail.com",
       employer: "UNIVERSITY OF UYO",
       jobTitle: "Administrator",
       sex: "MALE",
       nextOfKin: "Mrs Happy Oshomah"


   };
   try {
    const newMeberDetails = await new Members(newMember).save();
    console.log("finished saving admin member details");
    //create a user account: 
    console.log("hashing password", process.env.Admin_Password);
    const hashedPassword = await bcrypt.hash(process.env.Admin_Password!, 10);
    const newUser: UserType = {
      bioDataID: newMeberDetails._id,
      username: "jamiebones147@gmail.com",
      password: hashedPassword,
      role: "ADMIN" as RoleEnum
    }
    console.log("saving admin login details");
    await new User(newUser).save()
    console.log("finished saving new login details");
    return "New Admin Details Created"
   } catch (error: any) {
     throw new Error("Error creating admin user: ", error)
   }

}

export default createAdmin