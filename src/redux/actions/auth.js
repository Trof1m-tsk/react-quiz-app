import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdE3E_s8e-vKFeClaLDM3dRLSsDypNw7A'

        if (isLogin) {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdE3E_s8e-vKFeClaLDM3dRLSsDypNw7A'
        }

        const response = await axios.post(authURL, authData)

        const data = response.data
        console.log(data);

        const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
        )

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else{
                dispatch(authSuccess(token))
                dispatch(
                    authSuccess(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
