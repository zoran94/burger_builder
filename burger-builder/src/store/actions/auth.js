import * as actionTypes from "./actions";
import axios from "axios";

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId 
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH__FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkExpirationTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout())
        }else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem("userId")
                dispatch(authSuccess(token, userId));
                dispatch(checkExpirationTime(expirationDate.getSeconds() - new Date().getSeconds()))
            }
        }
    }
}





export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password:password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD9RVXtLz2rJzCiepEU60N64gbEV16SEz8";
        if(!isSignup){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD9RVXtLz2rJzCiepEU60N64gbEV16SEz8"
        }


        axios.post(url, authData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("exporationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkExpirationTime(response.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}