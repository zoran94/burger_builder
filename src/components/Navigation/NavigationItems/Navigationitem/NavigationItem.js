import React from "react";
import "./item.css";
import { NavLink } from "react-router-dom";

const NavigationItem =(props)=>{
    return (
        
        <li className="Item">
        <NavLink 
        to={props.link} exact={props.exact} >
        {props.children}</NavLink>
        </li>
    
    )
}

export default NavigationItem