/** @format */

import axios from 'axios'
import { FaBullseye } from 'react-icons/fa'
const LOCAL_HOST = 'http://localhost:3001'

export function getClothing(allFilters) {
    return async function (dispatch) {
        try {
            axios
                .get(`${LOCAL_HOST}/api/clothing?${allFilters}`)
                .then((response) => {
                    return dispatch({
                        type: 'GET_CLOTHING',
                        payload: response.data,
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            const errorMessage = { error: error.message }
            console.log(
                'Se a detectado un error en actions.js -- Linea 20 --',
                errorMessage
            )
            return dispatch({
                type: 'GET_CLOTHING',
                payload: errorMessage,
            })
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
    }
}

export function addClothing(payload) {
    return async function (dispatch) {
        try {
            var info = await axios.post(
                `${LOCAL_HOST}/api/clothing/add`,
                payload
            )
            return dispatch({
                type: 'ADD_CLOTHING',
                info,
            })
        } catch (error) {
            const errorMessage = { error: error.message }
            console.log(errorMessage)
        }
    }
}

export function getClothingDetail(name) {
    return async function (dispatch) {
        try {
            const cloth = await axios.get(`${LOCAL_HOST}/api/clothing/${name}`)
            return dispatch({
                type: 'GET_CLOTHING_DETAIL',
                payload: cloth.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getClothingByName(name) {
    return async function (dispatch) {
        try {
            const cloth = await axios.get(
                `${LOCAL_HOST}/api/clothing/search?name=${name}`
            )
            return dispatch({
                type: 'SEARCH_CLOTHING_NAME',
                payload: cloth.data,
            })
        } catch (error) {
            console.log(error)
            return alert('Clothing was not found')
        }
    }
}

export function setOrderByPrice(price) {
    return {
        type: 'SET_ORDER_PRICE',
        payload: price,
    }
}

export function clearState() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_STATE' })
    }
}

/*  AUTH  */

import {
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    singInWithGoogle,
    logoutFirebase,
} from '../../firebase/providers'

export const checkingAuthentication = () => {
    return async (dispatch) => {
        sessionStorage.setItem('authenticated', false)
        dispatch({
            type: 'CHECKING_CREDENTIALS',
        })
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CHECKING_CREDENTIALS',
        })

        const result = await singInWithGoogle()
        if (!result.ok) {
            sessionStorage.setItem('authenticated', false)
            return dispatch({
                type: 'LOGOUT',
                payload: result.errorMessage,
            })
        }
        try {
            await axios.get(`${LOCAL_HOST}/api/user/info/${result.displayName}`)
        } catch {
            await axios.post(`${LOCAL_HOST}/api/user/register`, {
                username: result.displayName,
                email: result.email,
                password: result.uid,
                country: 'argentina',
                isAdmin: false,
            })
        }

        sessionStorage.setItem('authenticated', true)
        dispatch({
            type: 'LOGIN',
            payload: result,
        })
    }
}

export const startCreatingUserWithEmailPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch({
            type: 'CHECKING_CREDENTIALS',
        })

        const result = await registerUserWithEmailPassword({
            email,
            password,
            displayName,
        })
        if (!result.ok) {
            sessionStorage.setItem('authenticated', false)
            return dispatch({
                type: 'LOGOUT',
                payload: result.errorMessage,
            })
        }

        await axios.post(`${LOCAL_HOST}/api/user/register`, {
            username: email,
            email,
            password,
            country: 'argentina',
            isAdmin: false,
        })

        sessionStorage.setItem('authenticated', true)
        dispatch({
            type: 'LOGIN',
            payload: result,
        })
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({
            type: 'CHECKING_CREDENTIALS',
        })
        try {
            const user = await axios.get(`${LOCAL_HOST}/api/user/info/${email}`)
            sessionStorage.setItem('authenticated', false)

            console.log('user', user)

            const result = await loginWithEmailPassword({ email, password })

            if (!result.ok) {
                sessionStorage.setItem('authenticated', false)
                return dispatch({
                    type: 'LOGOUT',
                    payload: result.errorMessage,
                })
            }
            sessionStorage.setItem('authenticated', true)
            dispatch({
                type: 'LOGIN',
                payload: result,
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: 'LOGOUT',
                payload: result.errorMessage,
            })
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()

        dispatch({
            type: 'LOGOUT',
            payload: result.errorMessage,
        })
    }
}
