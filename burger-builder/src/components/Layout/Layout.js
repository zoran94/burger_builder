import React from "react"

import Aux from "./../../hoc/Aux";
import "./layout.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    state ={
        showSideDrawer: true
    }
    
    
    SideDrawerCloseHandler = () => {
            this.setState({
                showSideDrawer: false
            })
    }

    sideDrawToggleHandler = (prevState) => {
        this.setState({
            showSideDrawer: !prevState.showSideDrawer
        })
    }

    render(){

        return (
            <>
        <Aux>
        <Toolbar
        toggleClicked={this.sideDrawToggleHandler}
         />
        <SideDrawer
        open={this.state.showSideDrawer}
         closeSide={this.SideDrawerCloseHandler} />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className="content">
            {this.props.children}
        </main>
        </Aux>
        </>
)
}
}

export default Layout