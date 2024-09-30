import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import { BACKEND_URL } from "../utils/constants";
import { RotatingLines } from 'react-loader-spinner';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        const token = localStorage.getItem('story-token');

        if(token) {
            getUser(token)
        } else {
            setUser(null)
        }
    },[])

    const getUser = async (token) => {
       
       try {
         setLoading(true)
         console.log("in get user func. : loading status: ", loading);
         
         const URL = `${BACKEND_URL}/user/user-details`
         const response = await axios.get(URL, {
             headers: {
                 Authorization: token
             }
         })
         setUser(response.data.data)
         setLoading(false)   
         console.log("everything done, loading STatus: ", loading);

       } catch (error) {
        console.error(error)
       }        
    }


    const login = (userData, token) => { 
        setUser(userData);
        localStorage.setItem('story-token', token)
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('story-token');
    }

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}