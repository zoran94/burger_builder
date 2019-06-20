import React from "react";
import burgerLogo from "./../../assets/Images/27.1 burger-logo.png.png"
import "./logo.css";

const Logo = props => (
    <div className="Logo" style={{height: props.height}}>
    <img src={burgerLogo} alt="myBurger" />

    </div>
);

export default Logo;