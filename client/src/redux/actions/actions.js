/** @format */

import axios from "axios";
const LOCAL_HOST = "http://localhost:3001";

export function getClothing(categories) {
  return async function (dispatch) {
    let joinCategories;
    try {
      if (categories) {
        joinCategories = categories.join(",");
      } else {
        joinCategories = "";
      }
      console.log(joinCategories);
      axios
        .get(`${LOCAL_HOST}/api/clothing?categories=${joinCategories}`)
        .then((response) => {
          return dispatch({ type: "GET_CLOTHING", payload: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      const errorMessage = { error: error.message };
      console.log(
        "Se a detectado un error en actions.js -- Linea 20 --",
        errorMessage
      );
      return dispatch({
        type: "GET_CLOTHING",
        payload: errorMessage,
      });
    }
    // try {
    //   axios
    //     .get(`https://data.mongodb-api.com/app/data-oovux/endpoint/clothes`, {
    //       headers: {
    //         'api-key': `NXL8cE2iVb8gFma3cGU2JZbWrkTnHL9P0xegtO0RPKz7mfmh9Yptejsl1oVoZNBd`,
    //       },
    //     })
    //     .then((response) => {
    //       return dispatch({ type: 'GET_CLOTHING', payload: response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } catch (error) {
    //   const errorMessage = { error: error.message };
    //   console.log(
    //     'Se a detectado un error en actions.js -- Linea 20 --',
    //     errorMessage
    //   );
    //   return dispatch({
    //     type: 'GET_CLOTHING',
    //     payload: errorMessage,
    //   });
    // }
  };
}
export function addClothing(name, image, price) {
  return function (dispatch) {
    dispatch({
      type: "ADD_CLOTHING",
      payload: {
        name: name,
        image: image,
        price: price,
      },
    });
  };
}

export function getClothingDetail(name) {
  return async function (dispatch) {
    try {

      const cloth = await axios.get(`${LOCAL_HOST}/api/clothing/${name}`)

      console.log(cloth.data);
      return dispatch({
        type: "GET_CLOTHING_DETAIL",
        payload: cloth.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setOrderByPrice(price) {
  return {
    type: "SET_ORDER_PRICE",
    payload: price,
  };
}
