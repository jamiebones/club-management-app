
import dues from "./objectResolver/dues.js";
import paymentReceived from "./objectResolver/paymentReceived.js";
import drinksBanked from "./objectResolver/drinksBanked.js";
import drinksBought from "./objectResolver/drinksBought.js";

export default {
  // Object Resolvers
  Member: {
    dues,
    paymentReceived,
    drinksBanked,
    drinksBought
  },
 
};
