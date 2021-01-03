import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from './types'
import setAuthToken from '../utils/setAuthToken'

//Load User
export const loadUser = () => async dispatch => {
    if ( localStorage.token ){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : AUTH_ERR
        })
    }
}

//REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
    
    const config= {
        headers :{ 'Content-Type':'application/json' }
    }
    const body = JSON.stringify({ name, email, password });

    try {
        console.log('register post request')
    const res = await axios.post('/api/users', body, config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });
    dispatch(loadUser());
    } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response)
    console.log(errors)

    if (errors){
        errors.forEach(error => {
            console.log(error.msg)
            dispatch(setAlert(error.msg, 'danger'))
        })
    }
    dispatch({
        type: REGISTER_FAIL
    })
}

}

//LOGIN USER
export const login = ( email, password ) => async dispatch => {
    
    const config= {
        headers :{ 'Content-Type':'application/json' }
    }
    const body = JSON.stringify({  email, password });

    try {
        console.log('login post req')
    const res = await axios.post('/api/auth', body, config);

    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });
    dispatch(loadUser());
    } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)

    if (errors){
        errors.forEach(error => {
            console.log(error.msg)
            dispatch(setAlert(error.msg, 'danger'))
        })
    }
    dispatch({
        type: LOGIN_FAIL
    });
}

}