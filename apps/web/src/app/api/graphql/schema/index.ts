import common from "./common";
import member from "./member";
import barSale from "./barSale";
import barStock from "./barStock";
import drinksBank from "./drinksBank";
import users from "./users";
import staff from "./staff";
import payment from "./payment";
import duesPayment from "./duesPayment";
import supplier from "./supplier";
import error from "./error";

const typeDefs = [
  ...member,
  ...common,
  ...barSale,
  ...barStock,
  ...drinksBank,
  ...users,
  ...staff,
  ...supplier,
  ...payment,
  ...duesPayment,
  ...error
];

export default typeDefs;
