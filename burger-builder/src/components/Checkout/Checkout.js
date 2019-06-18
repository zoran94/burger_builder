import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "./../Order/checkoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    // state ={
    //     ingredients: null,
    //     price: 5
    // }

    // componentWillMount(){
    //     const query  = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === "price"){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1] 
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice:price})
    // }

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





export default connect(mapStateToProps)(Checkout);