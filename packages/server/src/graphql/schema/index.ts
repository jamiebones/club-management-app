import common from "./common/index.js";
import member from "./member/index.js";
import barSale from "./barSale/index.js";
import barStock from "./barStock/index.js";
import drinksBank from "./drinksBank/index.js";
import users from "./users/index.js";
import staff from "./staff/index.js";
import payment from "./payment/index.js";
import duesPayment from "./duesPayment/index.js";
import supplier from "./supplier/index.js";
import error from "./error/index.js";

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
