import React from "react";
import { connect } from "react-redux";

import Spinner from "./../../components/UI/Spinner/Spinner";
import Input from "./../../components/UI/Input/input";
import Button from "./../../components/UI/Button/Button";
import "./auth.css";
import { auth } from "./../../store/actions/auth";
import {Redirect} from   "react-router-dom";


class Auth extends React.Component {
    state = {
        orderForm: {
            email: {
                elemType: "input",
                elemConfig: {
                    type: "emai",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false

            },
            password: {
                elemType: "input",
                elemConfig: {
                    type: "password",
                    placeholder: "Your Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false
            },
            
        },
        isSignUp: true
    }

    checkValididty(value, rules) {
        let isValud = false;

        if(rules.required){
            isValud = value.trim() !== "" && isValud
        }
        if(rules.minLength){
            isValud = value.length >= rules.minLength;
        }

        return isValud
    }


    onInputHandler = (event, elemIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormElem = {
            ...updatedForm[elemIdentifier]
        };
        updatedFormElem.value = event.target.value;
        updatedFormElem.valid = this.checkValididty(updatedFormElem.value, updatedFormElem.validation)
        updatedForm[elemIdentifier] = updatedFormElem
      
        this.setState({
            orderForm: updatedForm
        })

    }

    onSubmitHandler = () => {
       this.props.onAuth(this.state.orderForm.email.value, 
        this.state.orderForm.password.value,
        this.state.isSignUp)
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){

        let formElemsArr = [];
        for (let key in this.state.orderForm) {
            formElemsArr.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }
        let form = formElemsArr.map(formElem => {
            return (
                <Input
                        key={formElem.id}
                        elemType={formElem.config.elemType}
                        elemConfig={formElem.config.elemConfig}
                        value={formElem.config.value}
                        invalid={!formElem.config.valid}
                    changed={(event) => this.onInputHandler(event, formElem.id)}
                    />
            )
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />
        }

        return (
            <div className="auth">
            {authRedirect}
            <form onSubmit={(e) => {
                e.preventDefault();
                this.onSubmitHandler()   
            }}>
            {form}
            {errorMessage}
            <Button btnType="Success">Submit</Button>
            </form>
            <Button 
            clicked={this.switchModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);