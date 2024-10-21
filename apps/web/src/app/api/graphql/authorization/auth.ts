
import { skip } from "graphql-resolvers";

const roles = ["SALES","PRESIDENT","BARSECRETARY", "TREASURER", 
               "SECRETARY", "ADMIN", "SOCIALSECRETARY", "SPORTSECRETARY", "FINANCIALSECRETARY"]


const IsAuthenticated = (parent: any, args: any, context: any) => {
    if (context?.token) {
        return skip;
      } else {
        throw new Error("Not authenticated as user");
      }
};

const onlyAdmin = (parent: any, args: any, context: any) => {
    if (context?.token.role == "ADMIN") {
        return skip;
      } else {
        throw new Error("Only admin can call this function");
      }
};

const onlyFinancialRole = (parent: any, args: any, context: any) => {
    const roles = ["TREASURER","ADMIN", "PRESIDENT", "FINANCIALSECRETARY"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const allExcoMembers = (parent: any, args: any, context: any) => {
    const roles = ["PRESIDENT","BARSECRETARY", "TREASURER", 
    "SECRETARY", "ADMIN", "SOCIALSECRETARY", "SPORTSECRETARY", "FINANCIALSECRETARY"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const allAllowed = (parent: any, args: any, context: any) => {
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const allowAdministrativeTask = (parent: any, args: any, context: any) => {
    const roles = ["PRESIDENT","SECRETARY", "ADMIN", ]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const barSalesAllowed = (parent: any, args: any, context: any) => {
    const roles = ["SALES","BARSECRETARY","ADMIN"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const barStockAllowed = (parent: any, args: any, context: any) => {
    const roles = ["BARSECRETARY","ADMIN", "SALES"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const onlySalesAllowed = (parent: any, args: any, context: any) => {
    const roles = ["SALES","ADMIN", "BARSECRETARY"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};

const onlyFinancialAllowed = (parent: any, args: any, context: any) => {
    const roles = ["PRESIDENT", "TREASURER","SECRETARY", "ADMIN"]
    if (roles.includes(context?.token.role)) {
        return skip;
      } else {
        throw new Error("Not authorized role");
      }
};






  
export {
    IsAuthenticated,
    onlyAdmin,
    onlyFinancialRole,
    allExcoMembers,
    allAllowed,
    allowAdministrativeTask,
    barSalesAllowed,
    barStockAllowed,
    onlySalesAllowed,
    onlyFinancialAllowed
    
}