import React,{createContext,useEffect,useState,useContext} from "react";
import { UserContext } from "../context/UserContext";

export const UserIdContext = createContext()

export const UserIdProvider = (props)=>{
    const [token] = useContext(UserContext)
    const [userId,setUserId] = useState(localStorage.getItem("UserID"))

    useEffect(()=>{
        const fetchUser = async () => {
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            };
      
            const response = await  fetch("/api/user/", requestOptions)
            const data =  await response.json()
      
            if (!response.ok) {
              setUserId(null);
            }
            else{
              setUserId(data.id)
              
              
            }
            
            localStorage.setItem("UserID", userId)
          }
          fetchUser();
        
    },[userId])

    return (
        <UserIdContext.Provider value={[userId,setUserId]}>
          {props.children}
        </UserIdContext.Provider>
      )
}