import React, { Component } from "react";

import Spinner from "./../../UI/Spinner/Spinner";
import Button from "./../../UI/Button/Button";
import "./contactdata.css"
import axios from "../../../axios-order";
import Input from "./../../UI/Input/input";
import { connect } from "react-redux";
import {fetchBurgerOrder} from "./../../../store/actions/order";
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elemType: "input",
                elemConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false
            },
            street: {
                elemType: "input",
                elemConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false

            },

            zipcode: {
                elemType: "input",
                elemConfig: {
                    type: "text",
                    placeholder: "Zip code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false

            },
            country: {
                elemType: "input",
                elemConfig: {
                    type: "text",
                    placeholder: "Your country"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false

            },
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
            deliveryMethod: {
                elemType: "select",
                elemConfig: {
                    options: [{ value: "fastest", display: "Fastest" },
                            { value: "chepest", display: "Chepaest" }]
                },
                value: "fastest",
                validation: {},
                valid: true
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


    orderHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        for(let orderFormIElemdentifier in this.state.orderForm){
            orderData[orderFormIElemdentifier] = this.state.orderForm[orderFormIElemdentifier].value;

        }
        const order = {
            ingredients: this.props.ingreds,
            price: this.props.price,
            orderFormData: orderData,
            userid: this.props.userId

        }
        this.props.onOrderBurger(order, this.props.token)
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


    render() {
        let formElemsArr = [];
        for (let key in this.state.orderForm) {
            formElemsArr.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElemsArr.map(formElem => {
                    return <Input
                        key={formElem.id}
                        elemType={formElem.config.elemType}
                        elemConfig={formElem.config.elemConfig}
                        value={formElem.config.value}
                        invalid={!formElem.config.valid}
                    changed={(event) => this.onInputHandler(event, formElem.id)}
                    />
                })}
                <Button btnType="Success" >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(fetchBurgerOrder(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);