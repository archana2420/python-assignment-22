import React,{useEffect,useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import { UserIdContext } from "../context/UserIdContext";
import ProfileDetails from "./ProfileDetails";

const Profile = () =>{
    const [token] = useContext(UserContext)
    const [details,setDetails] = useState([])
    const [userId,setUserId] = useContext(UserIdContext)
    useEffect(()=>{
        const getUserInfo = async()=>{
            const requestOptions ={
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token,
                }
            }
            const response = await fetch("/api/user/",requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log("Something went wrong")
            }
            else{
                console.log(data)
                setDetails(data)
                setUserId(data.id)
                
            }
        }
        getUserInfo()
    },[])

   
    return (
<div>
    <ProfileDetails details={details}/>
</div>
    )

}

export default Profile