import React ,{useState,useEffect,useContext}from "react";
import { UserContext } from "../context/UserContext";
import { UserIdContext } from "../context/UserIdContext";
import Profile from "./Profile";
import {Link} from 'react-router-dom'

const ProfileScreen = () =>{
    const [token] = useContext(UserContext)
   
    const [userId,setUserId] = useContext(UserIdContext)
    
    
    
        
    return (
        <div>
            <h2 className="title is-2 has-text-centered">Profile</h2>
            <Profile/>
            <div className="is-flex is-justify-content-center m-3">
            <Link to='/dashboard'>
            <button className="button is-primary">Go to Dashboard</button>
            </Link>
            </div>
            
            
           
            
        </div>
    )
}

export default ProfileScreen