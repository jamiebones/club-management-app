
import dues from "./objectResolver/dues";
import paymentReceived from "./objectResolver/paymentReceived";
import drinksBanked from "./objectResolver/drinksBanked";
import drinksBought from "./objectResolver/drinksBought";

export default {
  // Object Resolvers
  Member: {
    dues,
    paymentReceived,
    drinksBanked,
    drinksBought
  },
 
};
