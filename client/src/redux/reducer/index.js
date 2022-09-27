/** @format */

//Estado global inicial
const initialState = {
  clothing: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CLOTHING':

    default:
      return state;
  }
}

export default rootReducer;
