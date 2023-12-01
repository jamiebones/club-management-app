import { Members } from "../../../../models/memberModel.js";
//import { AddMemberInput, Member } from "../../../../generated";


const addMember = async (
  parent: any,
  args: { request:any },
  context: any,
  info: any,
) => {
  try {
    const { } = args.request;
    console.log("Mutation > addMember > args.fields = ", args.request);

  ;

    // let fields: Member = {};
    // fields.discordID = discordID;
    // fields.registeredAt = new Date();

  
  } catch (err: any) {
    // throw new ApolloError(err.message, err.extensions?.code || "DATABASE_ERROR", {
    //   component: "tmemberMutation > addMember",
    // });
  }
};

export default addMember;
