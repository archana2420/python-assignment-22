import axios from "axios";
import React, { useState,useEffect } from "react";


const ProfileDetails = ({details}) =>{
const  {id,name,email,wallet} = details
const [city,setCity] = useState('')
const [temp,setTemp] = useState(0)
const [conditions,setConditions] = useState('')
const [humidity,setHumidity] = useState(0)
const [visibility,setVisibility] = useState(0)
const [amount,setAmount] = useState(0)
const [loading,setLoading] = useState(false)
const [showWeather,setShowWeather] = useState(false)


const showPayment = ()=>{
    document.getElementById('payment').style.display='block'
    document.getElementById('buttonAdd').style.display='none'
}

const addMoneytoWallet = async()=>{
    // const amount = prompt("Enter amount")
    if (amount!=0)
    {
       axios.post("/api/user/add-money/",{
        id:id,
        wallet:amount
       }).then((response)=>{
        window.location.reload(true)
       }).catch(()=>{
        console.log("Something went wrong")
       })
        
        // const requestOptions = {
        //     method:"POST",
        //     headers: { "Content-Type": "application/json" },
        //     body:JSON.stringify({
        //         id:id,
        //         wallet:amount
        //     })
           
        // }
        // console.log(requestOptions.body)
        // const response = await fetch("/api/user/add-money/",requestOptions)
        // const data = await response.json()

        // if(!response.ok){
        //     console.log("Something went wrong")
        // }
        // else{
        //     console.log(data)
        //     window.location.reload(true)

        // }
    }
    else{
        alert("invalid")
    }
    
}
const addMoney = (e)=>{
    e.preventDefault()
    addMoneytoWallet()
}
const getWeatherDeatails = async()=>{
    setLoading(true)
    axios.post("/api/user/weather/",{
        city:city
    }).then((response)=>{
        console.log(response.data)
        setConditions(response.data.conditions)
        setTemp(response.data.temp)
        setHumidity(response.data.humidity)
        setVisibility(response.data.visibility)
        setLoading(false)
        setShowWeather(true)
        console.log(showWeather)
    }).catch(()=>{
        setLoading(false)
        setShowWeather(false)
    })
    // const requestOptions ={
    //     method:"POST",
    //     headers:{"Content-Type":"application/json"},
    //     body:JSON.stringify({
    //         city:city
    //     })
    // }
    // const response = await fetch("/api/user/weather/",requestOptions)
    // const data = await response.json()

    // if(!response.ok){
    //     console.log("Could not get weather details")
    // }
    // else{
    //     console.log(data)
    //     setConditions(data.conditions)
    //     setTemp(data.temp)
    //     setHumidity(data.humidity)
    //     setVisibility(data.visibility)
    //     setLoading(false)
    //     setShowWeather(true)
    //     console.log(showWeather)
        
    // }
}
const getWeather = (e)=>{
    e.preventDefault()
    getWeatherDeatails()
    
    
    
}
return (
    <div className="is-flex is-justify-content-center">
    <div className="box " style={{width:"50rem",justifyContent:"center"}}>
        <div className="column ">
        <p className="has-text-centered has-text-weight-bold">User: {name}</p>
        <p className="has-text-centered has-text-weight-bold">Email: {email}</p>
        <p className="has-text-centered has-text-weight-bold">Wallet: ₹{wallet}</p>
        <div className="is-flex is-justify-content-center m-1">
        <button className="button is-info" onClick={showPayment} id="buttonAdd">Add Money</button>
        </div>
        <div className="column m-6 p-4" id="payment" style={{display:"none"}}>
        <form onSubmit={addMoney}>
            <div className="field is-small">
            <label className="label is-small">Card:</label>
            <div className="control is-small">
            <input type="text" placeholder="Enter Card Number" className="input is-small"  ></input>
            </div>
            </div>
            <div className="field is-small">
            <label className="label is-small">Expiry Date:</label>
            <div className="control is-small">
            <input type="date"  className="input is-small"  ></input>
            </div>
            </div>
            <div className="field is-small">
            <label className="label is-small">CVV:</label>
            <div className="control is-small">
            <input type="text" placeholder="Enter CVV"  className="input is-small"  ></input>
            </div>
            </div>
            <div className="field is-small">
            <label className="label is-small">Amount:</label>
            <div className="control is-small">
            <input type="number" placeholder="Enter Amount" name={amount} onChange={(e)=>setAmount(e.currentTarget.value)} className="input is-small"  ></input>
            </div>
            </div>
            <div className="is-flex is-justify-content-center m-1">
        <button className="button is-success" >Add Money</button>
        
        </div>
        </form>
        </div>
        
        
        </div>
        
        <div className="column ">
            <form>
                <div className="field">
                    <label className="label">Location:</label>
                    <div className="control">
                    <input 
                    className="input"
                    type="text" 
                    placeholder="Enter Location" 
                    name={city}
                    onChange={(e)=>{
                        setCity(e.currentTarget.value)
                        setShowWeather(false)
                    }}
                    />
                    </div>
                    <div className="is-flex is-justify-content-center m-1">
                    <button className="button is-small is-info" type="submit" onClick={getWeather}>Search</button>
                    </div>
                    
                </div>
                
            </form>
        </div>
        <div>

        </div>
        {loading?<h1 className="title is-6 has-text-centered">Loading...</h1>:(showWeather ?<div  className="has-text-centered">
            <h1 className="title is-3 has-text-centered">Weather</h1>
            <p className="has-text-weight-semibold">City: {city}</p>
            <p className="has-text-weight-semibold">Conditions: {conditions}</p>
            <p className="has-text-weight-semibold">Temp: {temp}</p>
            <p className="has-text-weight-semibold">Humidity: {humidity}</p>
            <p className="has-text-weight-semibold">Visibility: {visibility}</p>
        </div>:<h3 className="title is-6 has-text-centered">City Not Found</h3>)}
        
    </div>
    </div>
    
)
}

export default ProfileDetails