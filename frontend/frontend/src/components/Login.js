import React, { useState,useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [token, setToken] = useContext(UserContext)
    
    const onUserFormSubmit = async()=>{
        const requestOptions ={
            method:"POST",
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            body: JSON.stringify(
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            )
        }
        const response = await fetch("/api/token/",requestOptions)
        const data = await response.json()

        if(!response.ok){
            console.log(data.detail)
            setErrorMessage("Error")

        }
        else{
            setToken(data.access_token)
            console.log("Successfully Logged In")
        }
        
    }
    
        
    
   
    const handleSubmit = (e)=>{
        e.preventDefault()
        onUserFormSubmit()
       
        
    }

    return(
        <div className="is-flex is-justify-content-center m-6 " style={{width:"30rem"}} >
            <div className="column " >
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Login</h1>
                
                <div className="field">
                    <label className="label">Email Address:</label>
                    <div className="control">
                        <input 
                        className="input"
                        type="email" 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password:</label>
                    <div className="control">
                        <input 
                        className="input"
                        type="password" 
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.currentTarget.value)}
                        />
                    </div>
                    </div>
                    
                    {/* <ErrorMessage message={errorMessage}/> */}
                    <button className="button is-primary" type="submit" >Login</button>
                    <br></br>
                    <Link to="/register">
                    <a className="mt-2">Not a member? Register here</a>
                    </Link>
                    
            </form>
            
        </div>
        </div>
        
    )
}

export default Login