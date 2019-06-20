import React from "react";
import Aux from "../../hoc/Ouxed";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as burgerBuilderActions from "./../../store/actions/burgerBuilder";

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        loading: false

    }

    componentDidMount() {
        this.props.onFetchIngredients()
    }

    isModalClosed = () => {
        this.setState({ purchasing: false })
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }else {
            this.props.history.push("/auth")
        }
    }

    purchaseContinueHandler = () => {
        //  alert("you continue! fast");

        // const queryPramteres = [];
        // for(let i in this.state.ingredients){
        //     queryPramteres.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryPramteres.push("price=" + this.state.totalPrice)
        // const queryString = queryPramteres.join("&");
        this.props.onInitPurchase();
        this.props.history.push(
            "/checkout"
            // search: "?" + queryString
        )
    }



    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(iKey => {

                return ingredients[iKey]
            })
            .reduce((acc, curr) => {
                return acc + curr
            }, 0)

        return sum > 0

    }


    // onAddIngredienthandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // onRemoveIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ... this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     if (oldCount <= 0) {
    //         return;
    //     }

    //     const oldPrice = this.state.totalPrice;
    //     const priceDecrease = INGREDIENT_PRICES[type];
    //     const newPrice = oldPrice - priceDecrease

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients)

    // }



    render() {

        const disabledInfo = {
            ...this.props.ingreds
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = <Spinner />
        if (this.props.ingreds) {

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingreds} />
                    <BuildControls
                        addedIngredients={this.props.onIngredientAdd}
                        removedIngredients={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingreds)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ingreds}
                purchaseCancelled={this.isModalClosed}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.price} />
        }
        if (this.state.loading) {
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

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onFetchIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);