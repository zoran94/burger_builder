import React from "react";
import "./items.css";
import Navigationitem from "./Navigationitem/NavigationItem";


const NavigationItems =(props)=>{
    return (
      <ul className="NavigationItems">
            <Navigationitem link="/" exact> Burger Builder</Navigationitem>
            {props.isAuthenticated ? <Navigationitem link="/orders">Orders</Navigationitem>
            : null}
            {props.isAuthenticated 
            ? <Navigationitem link="/logout">Logout</Navigationitem> 
            : <Navigationitem link="/auth">Authenticate</Navigationitem>}
      </ul>
    )
}

export default NavigationItems