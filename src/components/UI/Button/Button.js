import React from "react";
import "./button.css";

const Button = (props) => {
    return (
        <button
         onClick={props.clicked}
         className={`Button ${props.btnType}`}
             > {props.children}</button>
    )

}

export default Button;