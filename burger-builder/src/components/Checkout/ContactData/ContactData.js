import React, { Component } from "react";

import Spinner from "./../../UI/Spinner/Spinner";
import Button from "./../../UI/Button/Button";
import "./contactdata.css"
import axios from "../../../axios-order";
import Input from "./../../UI/Input/input";

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
                value: ""
            },
        },
        loading: false
    }

    checkValididty(value, rules) {
        let isValud = false;

        if(rules.required){
            isValud = value.trim() !== ""
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

        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderFormData: orderData

        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push("/")
            })
            .catch(error => this.setState({ loading: false }))
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
                    console.log(formElem)
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
        if (this.state.loading) {
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

export default ContactData;