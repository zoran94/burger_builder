import React from "react";
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";
import "./sidedraw.css"
import Backdrop from "./../../UI/Backdrop/Backdrop";
import Aux from "./../../../hoc/Ouxed";

const SideDrawer = (props) => {
    let attachedClasses = ["SideDraw", "Close"];
    if(props.open){
        attachedClasses=["SideDraw", "Open"]
    }
        
    return (
        <Aux>
        <Backdrop show={props.open} 
        clicked={props.closeSide} />
        <div className={attachedClasses.join(" ")}>
            <Logo height="11%" />
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer;

