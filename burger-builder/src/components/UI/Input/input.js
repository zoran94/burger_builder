import React from 'react';
import "./input.css";

const input = props => {
    let inputElem = null;

    let addClass = {
        border: "1px solid red",
        background: "salmon"
    }
    let classAdded = null;
    if(props.invalid){
       classAdded = addClass;
    }

    switch (props.elemType) {
        case "input":
            inputElem = <input className="InputElem" {...props.elemConfig}
                value={props.value} 
                    onChange={props.changed}
                    style={classAdded}
                />
            break;
        case "textarea":
            inputElem = <textarea className="InputElem" {...props.elemConfig}
                value={props.value} 
                    onChange={props.changed}
                />
            break;
        case "select":
            inputElem = <select className="InputElem"
                onChange={props.changed}
                value={props.value}>
                {props.elemConfig.options.map(option => {
                    return <option
                        key={option.value}
                        value={option.value}>{option.display}
                    </option>
                })}
            </select>
            break;
        default:
            inputElem = <input className="InputElem"
            onChange={props.changed}
             {...props.elemConfig}
                value={props.value} />
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElem}
        </div>
    )
}

export default input;