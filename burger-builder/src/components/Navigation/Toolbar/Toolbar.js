import React from "react";
import "./toolbar.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";
import DrawToggle from "./../SideDrawer/drawToggle/DrawToggle";


const ToolBar = props => {
    return(
        <header className="Toolbar">
            <DrawToggle  clicked={props.toggleClicked} />
            <Logo height="80%" />
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    )
};

export default ToolBar;