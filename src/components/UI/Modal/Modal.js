import React from "react";
import "./modal.css"
import Aux from "../../../hoc/Ouxed";
import Backdrop from "./../Backdrop/Backdrop";


const Modal = (props) => {
    return (
        <Aux>
        <Backdrop 
        show={props.show}
        clicked={props.modalClosed}
         />
        <div 
         style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0"
        }}
        className="Modal">

        {props.children}
        </div>
        </Aux>
    )
}

export default Modal