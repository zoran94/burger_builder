import React from "react";
import "./checkoutsummary.css";
import Burger from "./../../Burger/Burger";
import Button from "./../../UI/Button/Button";


const checkoutsummary = props => {
    return(
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{width: "100%", height: "300px", margin: "auto"}}>
                <Burger ingredients={props.ingredients} />
            </div>
                <Button btnType="Danger" clicked={props.onCheckOutCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.onCheckOutContinue}>SUCCESS</Button>

        </div>
    )
}

export default checkoutsummary;