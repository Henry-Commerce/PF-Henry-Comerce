/** @format */

import axios from "axios";
const LOCAL_HOST = "http://localhost:3001";

export function getClothing(allFilters) {
  return async function (dispatch) {
    try {
      axios
        .get(`${LOCAL_HOST}/api/clothing?${allFilters}`)
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

export function addClothing(payload) {
  return async function (dispatch) {
    try {
      var info = await axios.post(`${LOCAL_HOST}/api/add`, payload);
      return dispatch({
        type: "ADD_CLOTHING",
        info,
      });
    } catch (error) {
      const errorMessage = { error: error.message };
      console.log(errorMessage);
    }
  };
}

export function getClothingDetail(name) {
  return async function (dispatch) {
    try {
      const cloth = await axios.get(`${LOCAL_HOST}/api/clothing/${name}`);

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

export function getClothingByName(name) {
  return async function (dispatch) {
    try {
      const cloth = await axios.get(
        `${LOCAL_HOST}/api/clothing/search?name=${name}`
      );
      return dispatch({
        type: "SEARCH_CLOTHING_NAME",
        payload: cloth.data,
      });
    } catch (error) {
      console.log(error);
      return alert("Clothing was not found");
    }
  };
}

export function setOrderByPrice(price) {
  return {
    type: "SET_ORDER_PRICE",
    payload: price,
  };
}

export function clearState() {
  return (dispatch) => {
    dispatch({ type: "CLEAR_STATE" });
  };
}
