import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async({ name, email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/register`;
        const requestPayload = { name, email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        return;
    }
}

export const loginUser = async({ email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = {  email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        return;
    }
}

export const updateUser = async({ name , password , userid}) => {
    try {
        let requestPayload;
        if(!password && name)
            requestPayload = {  name , userid };
        else if(!name && password)
            requestPayload = {  password , userid };
        else
            requestPayload = {  name , password , userid };
       
        const requestUrl = `${backendUrl}/auth/edituser`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(requestUrl, requestPayload);
        console.log(response);
        return response.data;
    } catch (error) {
        return;
    }
}