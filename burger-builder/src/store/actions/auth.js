import * as actionTypes from "./actions";
//import axios from "axios";

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH__FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        //axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]")
    }
}