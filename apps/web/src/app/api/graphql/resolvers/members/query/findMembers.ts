
import { Members } from "../../../../models/MemberModel";
import { Member, FindMembersInput, FindMembersCursorOutput, MemberOrderBy} from "../../../../generated/graphqlStaffClub";
import { GraphQLError } from 'graphql';
import mongoose from "mongoose";
import dbConnect from "../../../../../../../lib/dbConnect";
import { allExcoMembers, IsAuthenticated } from "../../../authorization/auth";
import { combineResolvers } from "graphql-resolvers";

interface SearchOptions {
  [key: string]: any;
}
const DEFAULT_PAGE_LIMIT = 20;


const findMembers = 
combineResolvers(IsAuthenticated, allExcoMembers, 
async (
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
    const { request: { jobTitle, memberType, sports, startBirthDate, endBirthDate, sex }, after, before, limit, orderBy } = args;
    console.log("Query > findMembers > args.fields = ", args);
    await dbConnect();
    let options: SearchOptions = {
    limit: limit || DEFAULT_PAGE_LIMIT,
  };

  console.log("context ", context.token);

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
  
  if (jobTitle && sex ) {
    if (sports && sports.length > 0) {
    searchQuery = {
        $and: [{ jobTitle: jobTitle, sex: sex }, 
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
        sex: sex
    };
    }
} else {
  //we don't have both memberType and jobTitle
  if ( jobTitle || sex ){
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
      } else if ( sex ){
          if (sports && sports.length > 0) {
              searchQuery = {
                  $and: [{ sex: sex }, {sports: {
                    $elemMatch: {
                      $in: sports.map(sport => new RegExp(sport!, 'i'))
                    }
                  }
                }],
              };
              } else {
              searchQuery = {
                  sex: sex
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

  
  // console.log("startDate : endDate", startBirthDate, endBirthDate)
  // console.log("query options ", options);

  console.log("search query ", searchQuery)
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

    //console.log(`membersData: ${membersData} || pageInfo: ${JSON.stringify(pageInfo)}`);
    return {
      members: membersData,
      pageInfo,
    };
   
  } catch (err: any) {
    throw new GraphQLError("Query -> findMembers -> ", err.message);
  }}

)

export default findMembers;