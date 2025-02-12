import * as actionTypes from "./../actions/actions";

const initialState = {
    ingredients: null,
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 5,
    cheese: 2.5,
    meat: 3,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4
            }
            case actionTypes.FETCH_INGREDIENTS: 
            return {
                ...state
            }

        default:
            return state;

    }
}


export default reducer;