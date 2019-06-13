import React from "react";
import Aux from "../hoc/Aux";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../components/ErrorHandler/Errorhandler";
import axios from "./../../axios-order";


const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 2.5,
    meat: 3,
    bacon: 5
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false

    }

    componentDidMount() {
        console.log(this.props)
        axios.get("https://burger-react-5a236.firebaseio.com/ingredients.json")
        
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {console.log(error)})
    }





    isModalClosed = () => {
        this.setState({ purchasing: false })
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseContinueHandler = () => {
        //  alert("you continue! fast");
     
        const queryPramteres = [];
        for(let i in this.state.ingredients){
            queryPramteres.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryPramteres.push("price=" + this.state.totalPrice)
        const queryString = queryPramteres.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        })
    }



    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(iKey => {

                return ingredients[iKey]
            })
            .reduce((acc, curr) => {
                return acc + curr
            }, 0)
        this.setState({
            purchaseable: sum > 0
        });
    }


    onAddIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    onRemoveIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ... this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        if (oldCount <= 0) {
            return;
        }

        const oldPrice = this.state.totalPrice;
        const priceDecrease = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDecrease

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients)

    }



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            console.log(disabledInfo[key])
        }
        let orderSummary = null;

        let burger = <Spinner /> 
        if(this.state.ingredients){

            burger = (
                <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                addedIngredients={this.onAddIngredienthandler}
                removedIngredients={this.onRemoveIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}    
            />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.isModalClosed}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />
    }
    if(this.state.loading){
        orderSummary = <Spinner />
    }
        return (
            <Aux>
                <Modal
                    modalClosed={this.isModalClosed}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;