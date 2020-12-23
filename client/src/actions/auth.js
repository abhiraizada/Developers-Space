import axios from 'axios'
import { setAlert } from './alert'
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types'


//REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
    
    const config= {
        header :{ 'Content-Type':'application/json' }
    }
    const body = JSON.stringify({ name, email, password });

    try {
        console.log('yeah')
    const res = await axios.post('/api/users', body, config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });
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