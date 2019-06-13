import React from "react";
import "./items.css";
import Navigationitem from "./Navigationitem/NavigationItem";


const NavigationItems =(props)=>{
    return (
      <ul className="NavigationItems">
            <Navigationitem link="/" exact> Burger Builder</Navigationitem>
            <Navigationitem link="/orders">Orders</Navigationitem>
      </ul>
    )
}

export default NavigationItems