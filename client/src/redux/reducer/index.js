/** @format */

//Estado global inicial
const initialState = {
  allClothing: [],
  detail: [],
  filtered: [],
  added: [],
  notFound: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CLOTHING":
      return {
        ...state,
        allClothing: action.payload,
        notFound: "",
      };

    case "GET_CLOTHING_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "SET_ORDER_PRICE":
      let orderByPrice = [...state.allClothing];
      orderByPrice = orderByPrice.sort((a, b) => {
        if (a.price < b.price) {
          return action.payload === "low" ? -1 : 1;
        }
        if (a.price > b.price) {
          return action.payload === "top" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allClothing: orderByPrice,
      };

    case "SEARCH_CLOTHING_NAME":
      return {
        ...state,
        allClothing: action.payload,
      };

    case "ADD_CLOTHING":

    case "FILTER_CLOTHING":

    case "SEARCH_BY_NAME":

    case "SORT_CLOTHING":

    case "RESET_DETAIL":

    case "RESET_CLOTHING":

    default:
      return state;
  }
}

export default rootReducer;
