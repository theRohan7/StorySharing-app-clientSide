import axios from "axios";
import { BACKEND_URL } from "../utils/constants.js"

const registerUser = async ({username, password}) => {
    try {
        console.log(username, password);
        
   
        const response = await axios.post(`${BACKEND_URL}/user/register`,{
            username,
            password
        })
        return response;
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const loginUser = async ({username, password}) => {
    try {
   
        const response = await axios.post(`${BACKEND_URL}/user/login`,{
            username,
            password
        })
        return response;
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}


export {
    registerUser,
    loginUser,
}