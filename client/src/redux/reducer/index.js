/** @format */

//Estado global inicial
const initialState = {
  allClothing: [],
  detail: [],
  filtered: [],
  added: [],
  notFound: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CLOTHING':
      return {
        ...state,
        allClothing: action.payload,
        notFound: '',
      };

    case 'GET_CLOTHING_DETAIL':

    case 'ADD_CLOTHING':

    case 'FILTER_CLOTHING':

    case 'SEARCH_BY_NAME':

    case 'SORT_CLOTHING':

    case 'RESET_DETAIL':

    case 'RESET_CLOTHING':

    default:
      return state;
  }
}

export default rootReducer;
