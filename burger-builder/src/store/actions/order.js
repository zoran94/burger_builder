import * as actionTypes from "./actions";
import axios from "./../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}



export const fetchBurgerOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
            .then(response => {
              dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => console.log(error))
    }
}

export const fetchOrderSucces = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart =()=> {
    return {
        type: actionTypes.FETCH_ORDERS
    }
}

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrderStart(token))
        axios.get("/orders.json?auth=" + token)
        .then(res => {
            let fetchedOrders = new Array();
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                id: key});
            }
            dispatch(fetchOrderSucces(fetchedOrders))
        })
        .catch(err => {
            console.log(err)
        })

    }
}