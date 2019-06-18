import * as actionTypes from "./actions";
import axios from "./../../axios-order";


export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burger-react-5a236.firebaseio.com/ingredients.json")
        
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {console.log(error)})
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}