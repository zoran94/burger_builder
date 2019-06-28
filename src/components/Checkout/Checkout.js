import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "./../Order/checkoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { purchaseInit } from "./../../store/actions/order";

class Checkout extends Component {

    componentWillMount(){
        this.props.onInitPurchase()
    }



    checoutCancelHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        let summary = <Redirect to="/" />
        let isPurchased = this.props.purchased ? <Redirect to="/" /> : null
        if(this.props.ingreds) {
            summary = (
                <div>
                {isPurchased}
                <CheckoutSummary 
                    onCheckOutCancel={this.checoutCancelHandler}
                    onCheckOutContinue={this.checkoutContinueHandler}
                ingredients={this.props.ingreds} />
                <Route path={this.props.match.path + "/contact-data"} 
               component={ContactData}
                />
                </div>
            )
        }
        return summary
    }

}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        purchased: state.order.purchased   
    }
}

const mapDispatchTopROPS = dispatch => {
    return {
        onInitPurchase: () => dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchTopROPS)(Checkout);