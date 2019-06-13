import React from "react";
import "./buildControl.css"


const buildControl = (props) => {
    return (
        <div className="buildControl">
            <div className="Label">{props.label}</div>
            <button className="Less"
             onClick={props.ingredientRemoved}
             disabled={props.disabled}
             >Less</button>
            <button className="More" onClick={props.ingredientsAdded}>More</button>

        </div>
    )
}

export default buildControl;