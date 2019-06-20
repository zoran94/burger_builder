import * as actionTypes from "./../actions/actions";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH__FAIL:
            return {
                ...state,
                error: action.error,
                loading: false

            }
            case actionTypes.AUTH_LOGOUT:
                return authLogout(state, action)
        default:
            return state;
    }
}

export default reducer;