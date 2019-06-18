import React from "react";
import { connect } from "react-redux";


import Input from "./../../components/UI/Input/input";
import Button from "./../../components/UI/Button/Button";
import "./auth.css";
import { auth } from "./../../store/actions/auth";



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
                    type: "text",
                    placeholder: "Your Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false
            },

        }
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
       this.props.onAuth(this.state.orderForm.email.value, this.state.orderForm.password.value)
    }

    render(){

        let formElemsArr = [];
        for (let key in this.state.orderForm) {
            formElemsArr.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }
        const form = formElemsArr.map(formElem => {
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

        return (
            <div className="auth">
            <form onSubmit={this.onSubmitHandler()}>
            {form}
            <Button btnType="Success">Submit</Button>
            </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password))
    }
}



export default connect(null, mapDispatchToProps)(Auth);