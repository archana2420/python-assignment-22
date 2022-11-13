import React, { useState,useContext, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { UserIdContext } from "../context/UserIdContext";

const Product = ({productDetails})=>{

    const {id,name,brand,description,price,stock,date_of_manufacture,thumbnail} = productDetails
    const [token] = useContext(UserContext)
    const [userId,setUserId] = useContext(UserIdContext)
    
    // useEffect(()=>{
    //     const fetchUser = async () => {
    //         const requestOptions = {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + token,
    //           },
    //         };
      
    //         const response = await fetch("/api/user/", requestOptions)
    //         const data = await response.json()
      
    //         if (!response.ok) {
    //           setUserId(null)
             
    //         }
    //         else{
    //           console.log(data)
    //           setUserId(data.id)
    //           console.log(userId)
    //           localStorage.setItem("UserID", data.id)
              
    //         }
            
    //         localStorage.setItem("UserID", userId)
    //       }
    //     //   fetchUser()
    // },[userId])
        
          
    
    
    const buyProducts = async()=>{
        const requestOptions ={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                product_id:id,
                product_stock:1,
                user_id:userId
            })
        }
        const response = await fetch("/api/user/item-purchase",requestOptions)
        const data = await response.json()
    
        if(!response.ok){
            console.log("Could not buy items")
        }
        else{
            console.log(data)
            window.location.reload(true)
        }
    }
    const buyItem = (e)=>{
        e.preventDefault()
        
        buyProducts()

    }
    // fetchUser()
    return (
        <div className="card m-3 p-3 has-text-centered" style={{width:"30rem",height:"27rem"}}>
            <div className="is-flex is-justify-content-center">
            <div className="card-image has-text-centered" style={{width:"10rem"}}>
            
            <figure className="image is-1by1 " >
                    <img src={thumbnail} alt={name}/>
                </figure>
            </div>
               
              
            </div>
            <div className="title is-4">{name}</div>
            <div className="subtitle is-6">
                <p className="has-text-weight-bold">{brand}</p>
                <p>{description}</p>
                <p className="p-1"><span style={{backgroundColor:"green",color:"white"}} >₹{price}</span></p>
                <p>Only {stock} left !!</p>
                <p className="has-text-weight-medium">DOF:{date_of_manufacture}</p>
            </div>
            <button className="button is-primary" onClick={buyItem}>Buy Now!</button>
        </div>
    )

}

export default Product