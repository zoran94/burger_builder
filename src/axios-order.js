import axios from "axios";


const instance = axios.create({
    baseURL: "https://burger-react-5a236.firebaseio.com/"
})

export default instance;
