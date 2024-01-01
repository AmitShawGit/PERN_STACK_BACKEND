import axios from "axios";

const apiCall = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    timeout:10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Accept": "application/json"
    }
})
export default apiCall;