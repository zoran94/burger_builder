import React from "react"

import Aux from "./../../hoc/Ouxed";
import "./layout.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";


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
        isAuth={this.props.isAuthenticated}
        toggleClicked={this.sideDrawToggleHandler}
         />
        <SideDrawer
        isAuth={this.props.isAuthenticated}
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


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps, null)(Layout)