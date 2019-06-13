import React from "react";
import "./buildControls.css";
import BuildControl from "./buildControl/buildControl";


const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]


const buildControls = (props) => {

    return (
        <div className="buildControls">
        <p>Current price:  <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(elem => {
                return <BuildControl 
                key={elem.label}
                 label={elem.label}
                 ingredientsAdded = {() => props.addedIngredients(elem.type)}
                ingredientRemoved = {() => props.removedIngredients(elem.type)}
                disabled={props.disabled[elem.type]}
                  />
            })}
            <button
            onClick={props.ordered}
            disabled={!props.purchaseable}
            className="OrderButton">ORDER NOW</button>
        </div>
    )
}

export default buildControls;
