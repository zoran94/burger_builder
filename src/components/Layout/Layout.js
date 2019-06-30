import React, {useState} from "react"

import Aux from "./../../hoc/Ouxed";
import "./layout.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";


const Layout = ({isAuthenticated, children}) => {

    const [showSideDrawer, setShowSideDriver] = useState(true)
    
    const SideDrawerCloseHandler = () => {
            setShowSideDriver(false)
    }

    const sideDrawToggleHandler = () => {
        setShowSideDriver(true)
    }



        return (
            <>
        <Aux>
        <Toolbar
        isAuth={isAuthenticated}
        toggleClicked={sideDrawToggleHandler}
         />
        <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
         closeSide={SideDrawerCloseHandler} />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className="content">
            {children}
        </main>
        </Aux>
        </>
)
}



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps, null)(Layout)