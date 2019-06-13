import React from "react";
import Aux from "../../../hoc/Ouxed";
import Button from "./../../UI/Button/Button";

class OrderSummary extends React.Component {

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(iKey => {
            return <li key={iKey}><span style={{textTransform: "capitalize"}}>{iKey}</span>: {this.props.ingredients[iKey]}</li>
        })
        
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
}

export default OrderSummary;