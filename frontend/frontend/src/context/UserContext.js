import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("LoginToken"))
  

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch("/api/user/", requestOptions)
      const data = await response.json()

      if (!response.ok) {
        setToken(null);
      }
      else{
        console.log(data)
        
      }
      
      localStorage.setItem("LoginToken", token)
    }
    fetchUser();
  }, [token])

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  )
}
