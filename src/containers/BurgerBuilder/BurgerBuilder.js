import React,{ useState, useEffect } from "react";
import Aux from "../../hoc/Ouxed";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as burgerBuilderActions from "./../../store/actions/burgerBuilder";

const BurgerBuilder = (props) =>  {
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        props.onFetchIngredients()
    }, [])

    const isModalClosed = () => {
        setPurchasing(false)
    }


    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        }else {
            props.history.push("/auth")
        }
    }

   const purchaseContinueHandler = () => {
        //  alert("you continue! fast");

        // const queryPramteres = [];
        // for(let i in this.state.ingredients){
        //     queryPramteres.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryPramteres.push("price=" + this.state.totalPrice)
        // const queryString = queryPramteres.join("&");
        props.onInitPurchase();
        props.history.push(
            "/checkout"
            // search: "?" + queryString
        )
    }



    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(iKey => {

                return ingredients[iKey]
            })
            .reduce((acc, curr) => {
                return acc + curr
            }, 0)

        return sum > 0

    }


    

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


        const disabledInfo = {
            ...props.ingreds
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = <Spinner />
        if (props.ingreds) {

            burger = (
                <Aux>
                    <Burger ingredients={props.ingreds} />
                    <BuildControls
                        addedIngredients={props.onIngredientAdd}
                        removedIngredients={props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchaseable={updatePurchaseState(props.ingreds)}
                        ordered={purchaseHandler}
                        price={props.price}
                        isAuth={props.isAuthenticated}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={props.ingreds}
                purchaseCancelled={isModalClosed}
                purchaseContinued={purchaseContinueHandler}
                totalPrice={props.price} />
        }
        if (loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal
                    modalClosed={isModalClosed}
                    show={purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
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