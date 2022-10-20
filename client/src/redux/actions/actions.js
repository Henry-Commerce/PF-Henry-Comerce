/** @format */

import axios from 'axios';
import { FaBullseye } from 'react-icons/fa';
const LOCAL_HOST = 'https://pfapi.vercel.app';

export function getClothing(allFilters) {
  return async function (dispatch) {
    try {
      axios
        .get(`${LOCAL_HOST}/api/clothing?${allFilters}`)
        .then((response) => {
          return dispatch({
            type: 'GET_CLOTHING',
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      const errorMessage = { error: error.message };
      console.log(
        'Se a detectado un error en actions.js -- Linea 20 --',
        errorMessage
      );
      return dispatch({
        type: 'GET_CLOTHING',
        payload: errorMessage,
      });
    }
  };
}

export function addClothing(payload) {
  return async function (dispatch) {
    try {
      const { token } = JSON.parse(localStorage.getItem('authenticated'));
      const info = await axios.post(`${LOCAL_HOST}/api/clothing/add`, payload, {
        headers: { 'x-access-token': `${token}` },
      });

      return dispatch({
        type: 'ADD_CLOTHING',
        info,
      });
    } catch (error) {
      const errorMessage = { error: error.message };
      console.log(errorMessage);
    }
  };
}

export function postReview(name, payload) {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem('authenticated')).token;
      const review = await axios.put(
        `${LOCAL_HOST}/api/clothing/reviewupdate/?name=${name}`,
        payload,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );
      return dispatch({
        type: 'POST_REVIEW',
        payload: review,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getClothingDetail(name) {
  return async function (dispatch) {
    try {
      const cloth = await axios.get(`${LOCAL_HOST}/api/clothing/items/${name}`);
      return dispatch({
        type: 'GET_CLOTHING_DETAIL',
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
        type: 'SEARCH_CLOTHING_NAME',
        payload: cloth.data,
      });
    } catch (error) {
      console.log(error);
      return alert('Clothing was not found');
    }
  };
}

export function setOrderByPrice(price) {
  return {
    type: 'SET_ORDER_PRICE',
    payload: price,
  };
}

export function clearState() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_STATE' });
  };
}

export function getAllBranches() {
  return async function (dispatch) {
    try {
      axios
        .get(`${LOCAL_HOST}/api/branch`)
        .then((response) => {
          return dispatch({
            type: 'GET_BRANCHES',
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      const errorMessage = { error: error.message };
      console.log(
        'Se a detectado un error en actions.js -- Linea 135 --',
        errorMessage
      );
      return dispatch({
        type: 'GET_BRANCHES',
        payload: errorMessage,
      });
    }
  };
}

/*  AUTH  */

import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
  logoutFirebase,
  singInWithGithub,
} from '../../firebase/providers';

export const checkingAuthentication = () => {
  return async (dispatch) => {
    sessionStorage.setItem('authenticated', false);
    dispatch({
      type: 'CHECKING_CREDENTIALS',
    });
  };
};

export const startGithubSignIn = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CHECKING_CREDENTIALS',
    });

    const result = await singInWithGithub();
    if (result.ok === false) {
      localStorage.setItem('authenticated', false);
      return dispatch({
        type: 'LOGOUT',
        payload: result.errorMessage,
      });
    }
    const { email, displayName, photoURL } = result;
    let admin = false;

    const password = email.toLowerCase();
    const creado = await axios.post(`${LOCAL_HOST}/api/user/register`, {
      username: displayName,
      email: email.toLowerCase(),
      password,
      image: photoURL,
      country: 'argentina',
      isAdmin: admin,
    });

    let token = creado.data.token;

    const existe = await axios.post(`${LOCAL_HOST}/api/user/login`, {
      email: email.toLowerCase(),
      password,
    });

    token = existe.data.token;

    const add = await axios.get(
      `${LOCAL_HOST}/api/user/info/${email.toLowerCase()}`,
      {
        headers: { 'x-access-token': `${existe.data.token}` },
      }
    );
    admin = add.data.isAdmin;
    localStorage.setItem(
      'authenticated',
      JSON.stringify({
        authenticated: true,
        isAdmin: admin,
        email,
        token: token,
      })
    );

    dispatch({
      type: 'LOGIN',
      payload: result,
    });
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CHECKING_CREDENTIALS',
    });

    const result = await singInWithGoogle();
    if (result.ok === false) {
      localStorage.setItem('authenticated', false);
      return dispatch({
        type: 'LOGOUT',
        payload: result.errorMessage,
      });
    }

    const { email, displayName, photoURL } = result;

    let admin = false;

    const password = email.toLowerCase();
    const creado = await axios.post(`${LOCAL_HOST}/api/user/register`, {
      username: displayName,
      email: email.toLowerCase(),
      password,
      image: photoURL,
      country: 'argentina',
      isAdmin: admin,
    });

    let token = creado.data.token;

    const existe = await axios.post(`${LOCAL_HOST}/api/user/login`, {
      email: email.toLowerCase(),
      password,
    });

    token = existe.data.token;

    const add = await axios.get(
      `${LOCAL_HOST}/api/user/info/${email.toLowerCase()}`,
      {
        headers: { 'x-access-token': `${existe.data.token}` },
      }
    );

    const mail = await axios.post(`${LOCAL_HOST}/api/user/welcome`, {
      data: {
        name: `${displayName}`,
        email: `${email}`,
      },
    });
    admin = add.data.isAdmin;
    localStorage.setItem(
      'authenticated',
      JSON.stringify({
        authenticated: true,
        isAdmin: admin,
        email,
        token: token,
      })
    );

    dispatch({
      type: 'LOGIN',
      payload: result,
    });
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHECKING_CREDENTIALS',
    });

    const creado = await axios.post(`${LOCAL_HOST}/api/user/register`, {
      username: email.toLowerCase(),
      email: email.toLowerCase(),
      password,
      form: true,
      country: 'argentina',
      isAdmin: false,
    });

    const token = creado.data.token;
    const mail = await axios.post(`${LOCAL_HOST}/api/user/welcome`, {
      data: {
        email: email,
        name: email,
      },
    });

    localStorage.setItem(
      'authenticated',
      JSON.stringify({
        authenticated: true,
        isAdmin: false,
        email,
        token: token,
      })
    );

    dispatch({
      type: 'LOGIN',
      payload: creado,
    });
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHECKING_CREDENTIALS',
    });

    let existe = {};
    try {
      existe = await axios.post(`${LOCAL_HOST}/api/user/login`, {
        email: email.toLowerCase(),
        password,
      });
    } catch (error) {
      return dispatch({
        type: 'IncorrectPassword',
      });
    }

    if (existe.status === 200) {
      const add = await axios.get(
        `${LOCAL_HOST}/api/user/info/${email.toLowerCase()}`,
        {
          headers: { 'x-access-token': `${existe.data.token}` },
        }
      );

      const admin = add.data.isAdmin;
      localStorage.setItem(
        'authenticated',
        JSON.stringify({
          authenticated: true,
          isAdmin: admin,
          email,
          token: existe.data.token,
        })
      );
      return dispatch({
        type: 'LOGIN',
        payload: existe,
      });
    }
  };
};

export const startLogout = (result) => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch({
      type: 'LOGOUT',
      payload: result.errorMessage,
    });
  };
};

export const checkAuth = (result) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHECKING_AUTH',
      payload: result,
    });
  };
};

export function getUser(email) {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${LOCAL_HOST}/api/user/info/${email}`);
      return dispatch({
        type: 'GET_USER',
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editUser(payload) {
  return async function (dispatch) {
    const token = JSON.parse(localStorage.getItem('authenticated')).token;
    try {
      let putUser = await axios.put(
        `${LOCAL_HOST}/api/user/edituser`,
        payload,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      return dispatch({
        type: 'EDIT_USER',
        putUser,
      });
    } catch (error) {
      return error.response.data;
    }
  };
}

export function deleteReview(name, payload) {
  return async function (dispatch) {
    const token = JSON.parse(localStorage.getItem('authenticated')).token;
    try {
      const review = await axios.put(
        `${LOCAL_HOST}/api/clothing/reviewupdate/?name=${name}`,
        payload,
        {
          headers: { 'x-access-token': `${token}` },
        }
      );
      return dispatch({
        type: 'DELETE_REVIEW',
        payload: review,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrders(email) {
  return async function (dispatch) {
    try {
      const orders = await axios.get(
        `${LOCAL_HOST}/api/checkout?email=${email}`
      );
      return dispatch({
        type: 'GET_ORDERS',
        payload: orders.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
