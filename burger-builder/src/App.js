import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import {connect} from "react-redux";
import "./App.css"
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout/Logout";
import { authCheckState } from "./store/actions/auth";


class App extends Component {

  componentDidMount(){
    this.props.onAutoSignup()
  }

  render() {

    return (
      <div>
        <Layout>
         <Route path="/auth" component={Auth} />
         {this.props.isAuthenticated ? <Switch>
         <Route path="/logout" component={Logout} />
         <Route path="/checkout" component={Checkout} />
         <Route path="/orders" component={Orders} />         
         <Route path="/" exact component={BurgerBuilder} />
         </Switch> :

         <h1 className="authorise">Welcome, please authenticate your account first!</h1>}
        
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
    
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
