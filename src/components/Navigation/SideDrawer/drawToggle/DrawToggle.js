import React from "react";
import "./drawtoggle.css"

const DrawToggle =(props) => {
    return (
        <div 
        className="DrawerToggle"
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
        </div>
    )
}




export default DrawToggle;