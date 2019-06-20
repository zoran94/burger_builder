import React from "react";
import Modal from "./../UI/Modal/Modal";
import Aux from "../../hoc/Ouxed";
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import axios from "./../../axios-order";

const withErrorHandler = (WrapperComponent, axios ) => {
    return class extends React.Component {
        state={error: null}

        componentDidMount(){
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor)

        }

        errorConfirmedHandler(){
            this.setState({error: null})
        }
        render(){
            return (
                <Aux>
            <Modal show={this.state.error}
            clicker={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message: null}
            </Modal>
            <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler(BurgerBuilder, axios);