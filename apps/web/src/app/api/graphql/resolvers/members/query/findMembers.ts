
import { Members } from "../../../../models/MemberModel";
import { Member, FindMembersInput, FindMembersCursorOutput, MemberOrderBy} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import mongoose from "mongoose";
import dbConnect from "../../../../../../../lib/dbConnect";

interface SearchOptions {
  [key: string]: any;
}
const DEFAULT_PAGE_LIMIT = 20;


const findMembers = async (
  parent: any,
  args: {
        request: FindMembersInput;
        orderBy: MemberOrderBy;
        after: String;
        before: String;
        limit: Number;
      },
  context: any,
  info: any,
):Promise<FindMembersCursorOutput> => {
    const { request: { jobTitle, memberType, sports, startBirthDate, endBirthDate }, after, before, limit, orderBy } = args;
    console.log("Query > findMembers > args.fields = ", args);
    await dbConnect();
    let options: SearchOptions = {
    limit: limit || DEFAULT_PAGE_LIMIT,
  };

  console.log("limit server ", limit)

    if (orderBy) {
    const sortField: any = orderBy.field;
    const sort = { [sortField]: orderBy.direction == "ASC" ? 1 : -1 };
    options.field = orderBy.field || "_id";
    options.sort = sort;
    options.direction = orderBy.direction == "ASC" ? 1 : -1;
  } else {
    options.field = "_id";
    options.sort = {
      _id: 1,
    };
    options.direction = 1;
  }

  let than_key_next = options.direction === 1 ? "$gt" : "$lt";
  let than_key_prev = options.direction === -1 ? "$gt" : "$lt";

    if (after) {
    let after_key: any = after;
    if (options.field === "_id") after_key = new mongoose.Types.ObjectId(String(after));
    options.filters = {
      [options.field]: {
        [than_key_next]: after_key,
      },
    };
  } else if (before) {
    let before_key: any = before;
    if (options.field === "_id") before_key = new mongoose.Types.ObjectId(String(before));
    options.filters = {
      [options.field]: {
        [than_key_prev]: before_key,
      },
    };
    options.sort[options.field] = -1 * options.sort[options.field];
  }
   

   let searchQuery = {};
  

    if (jobTitle && memberType ) {
        if (sports && sports.length > 0) {
        searchQuery = {
            $and: [{ jobTitle: jobTitle, membershipType: memberType }, 
              {sports: {
                $elemMatch: {
                  $in: sports.map(sport => new RegExp(sport!, 'i'))
                }
              }
            }
            ],
        };
        } else {
        searchQuery = {
            jobTitle : jobTitle,
            membershipType: memberType
        };
        }
  } else {
    //we don't have both memberType and jobTitle
    if ( jobTitle || memberType ){
        if ( jobTitle ){
            if (sports && sports.length > 0) {
                searchQuery = {
                    $and: [{ jobTitle: jobTitle }, {sports: {
                      $elemMatch: {
                        $in: sports.map(sport => new RegExp(sport!, 'i'))
                      }
                    }
                  }],
                };
                } else {
                searchQuery = {
                    jobTitle : jobTitle,
                };
            }
        } else if ( memberType ){
            if (sports && sports.length > 0) {
                searchQuery = {
                    $and: [{ membershipType: memberType }, {sports: {
                      $elemMatch: {
                        $in: sports.map(sport => new RegExp(sport!, 'i'))
                      }
                    }
                  }],
                };
                } else {
                searchQuery = {
                    membershipType: memberType
                };
            }
        }
    } else {
        if  (sports && sports.length > 0) {
         searchQuery = {sports: {
            $elemMatch: {
              $in: sports.map(sport => new RegExp(sport!, 'i'))
            }
          }
        }
        }
    }
  }

  if ( startBirthDate && endBirthDate && memberType ){
    searchQuery = {
        $and: [ {
          birthDay:{ $gte: startBirthDate, 
            $lte: endBirthDate 
        } 
        },
    { membershipType: memberType }
    ]
    }
  }else if ( startBirthDate && endBirthDate ){
    searchQuery = {
           birthDay:{ $gte: startBirthDate, 
                      $lte: endBirthDate 
            } 
          }
    }
  
  console.log("startDate : endDate", startBirthDate, endBirthDate)
  console.log("query options ", options);
    try {
    let membersData: any = await Members.find({ ...searchQuery, ...options.filters })
      .sort(options.sort)
      .limit(options.limit);

    if (before) membersData.reverse();

    let hasNextPage =
      membersData.length > 0
        ? !!(await Members.findOne({
            ...searchQuery,
            [options.field]: {
              [than_key_next]: membersData[membersData.length - 1][options.field],
            },
          }))
        : !!before;

    let hasPrevPage =
      membersData.length > 0
        ? !!(await Members.findOne({
            ...searchQuery,
            [options.field]: {
              [than_key_prev]: membersData[0][options.field],
            },
          }))
        : !!after;

    let pageInfo = {
      hasNextPage,
      hasPrevPage,
      start: membersData.length > 0 ? membersData[0][options.field] : after,
      end: membersData.length > 0 ? membersData[membersData.length - 1][options.field] : before,
    };

    console.log(`membersData: ${membersData} || pageInfo: ${JSON.stringify(pageInfo)}`);
    return {
      members: membersData,
      pageInfo,
    };
   
  } catch (err: any) {
    throw new GraphQLError("Query -> findMembers -> ", err.message);
  }}

export default findMembers;















// import { Members } from "../../../../models/memberModel";
// import { FindMembersInput, FindMembersCursorOutput, MemberOrderBy } from "../../../../generated";
// import { ApolloError } from "apollo-server-express";
// import mongoose from "mongoose";

// const DEFAULT_PAGE_LIMIT = 20;

// interface SearchOptions {
//   [key: string]: any;
// }

// const findMembers = async (
//   parent: any,
//   args: {
//     request: FindMembersInput;
//     orderBy: MemberOrderBy;
//     after: String;
//     before: String;
//     limit: Number;
//   },
//   context: any,
//   info: any,
// ): Promise<FindMembersCursorOutput> => {
//   const {
//     request: { discordID, serverID },
//     limit,
//     orderBy,
//     after,
//     before,
//   } = args;
//   console.log("Query > findMembers > args.fields = ", args);

//   let options: SearchOptions = {
//     limit: limit || DEFAULT_PAGE_LIMIT,
//   };

//   if (orderBy) {
//     const sortField: any = orderBy.field;
//     const sort = { [sortField]: orderBy.direction == "ASC" ? 1 : -1 };
//     options.field = orderBy.field || "_id";
//     options.sort = sort;
//     options.direction = orderBy.direction == "ASC" ? 1 : -1;
//   } else {
//     options.field = "_id";
//     options.sort = {
//       _id: 1,
//     };
//     options.direction = 1;
//   }

//   let than_key_next = options.direction === 1 ? "$gt" : "$lt";
//   let than_key_prev = options.direction === -1 ? "$gt" : "$lt";

//   if (after) {
//     let after_key: any = after;
//     if (options.field === "_id") after_key = mongoose.Types.ObjectId(String(after));
//     options.filters = {
//       [options.field]: {
//         [than_key_next]: after_key,
//       },
//     };
//   } else if (before) {
//     let before_key: any = before;
//     if (options.field === "_id") before_key = mongoose.Types.ObjectId(String(before));
//     options.filters = {
//       [options.field]: {
//         [than_key_prev]: before_key,
//       },
//     };
//     options.sort[options.field] = -1 * options.sort[options.field];
//   }

//   let queryServerID: any = [];
//   let searchQuery = {};

//   serverID?.forEach(ID => {
//     queryServerID.push(ID);
//   });

//   if (discordID) {
//     if (queryServerID.length > 0) {
//       searchQuery = {
//         $and: [{ discordID: discordID }, { $or: queryServerID }],
//       };
//     } else {
//       searchQuery = {
//         discordID: discordID,
//       };
//     }
//   } else {
//     if (queryServerID.length > 0) {
//       searchQuery = {
//         $or: queryServerID,
//       };
//     }
//   }

//   console.log("query options ", options);

//   try {
//     let membersData = await Members.find({ ...searchQuery, ...options.filters })
//       .sort(options.sort)
//       .limit(options.limit);

//     if (before) membersData.reverse();

//     let hasNextPage =
//       membersData.length > 0
//         ? !!(await Members.findOne({
//             ...searchQuery,
//             [options.field]: {
//               [than_key_next]: membersData[membersData.length - 1][options.field],
//             },
//           }))
//         : !!before;

//     let hasPrevPage =
//       membersData.length > 0
//         ? !!(await Members.findOne({
//             ...searchQuery,
//             [options.field]: {
//               [than_key_prev]: membersData[0][options.field],
//             },
//           }))
//         : !!after;

//     let pageInfo = {
//       hasNextPage,
//       hasPrevPage,
//       start: membersData.length > 0 ? membersData[0][options.field] : after,
//       end: membersData.length > 0 ? membersData[membersData.length - 1][options.field] : before,
//     };

//     console.log(`membersData: ${membersData} || pageInfo: ${JSON.stringify(pageInfo)}`);
//     return {
//       members: membersData,
//       pageInfo,
//     };
//   } catch (err: any) {
//     throw new ApolloError(err.message, err.extensions?.code || "DATABASE_FIND_TWEET_ERROR", {
//       component: "tmemberQuery > findMembers",
//     });
//   }
// };

// export default findMembers;
