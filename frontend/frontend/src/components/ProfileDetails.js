import React, { useState,useEffect } from "react";
import useRazorpay from "react-razorpay";

const ProfileDetails = ({details}) =>{
const  {id,name,email,wallet} = details
const [city,setCity] = useState('')
const [temp,setTemp] = useState(0)
const [conditions,setConditions] = useState('')
const [humidity,setHumidity] = useState(0)
const [visibility,setVisibility] = useState(0)
const [amount,setAmount] = useState(0)

const showPayment = ()=>{
    document.getElementById('payment').style.display='block'
    document.getElementById('buttonAdd').style.display='none'
}

const addMoneytoWallet = async()=>{
    // const amount = prompt("Enter amount")
    if (amount!=null)
    {
       
        
        const requestOptions = {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                id:id,
                wallet:amount
            })
           
        }
        console.log(requestOptions.body)
        const response = await fetch("/api/user/add-money/",requestOptions)
        const data = await response.json()

        if(!response.ok){
            console.log("Something went wrong")
        }
        else{
            console.log(data)
            window.location.reload(true)

        }
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
    const requestOptions ={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            city:city
        })
    }
    const response = await fetch("/api/user/weather/",requestOptions)
    const data = await response.json()

    if(!response.ok){
        console.log("Could not get weather details")
    }
    else{
        console.log(data)
        setConditions(data.conditions)
        setTemp(data.temp)
        setHumidity(data.humidity)
        setVisibility(data.visibility)
    }
}
const getWeather = (e)=>{
    e.preventDefault()
    getWeatherDeatails()
    document.getElementById("weather").style.display="inline"
    
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
        {/* <button onClick={handlePayment}>Click</button> */}
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
                        document.getElementById("weather").style.display="none"
                    }}
                    />
                    </div>
                    <div className="is-flex is-justify-content-center m-1">
                    <button className="button is-small is-info" type="submit" onClick={getWeather}>Search</button>
                    </div>
                    
                </div>
                
            </form>
        </div>
        <div style={{display:"none"}} id="weather" className="has-text-centered">
            <p className="has-text-weight-semibold">City: {city}</p>
            <p className="has-text-weight-semibold">Conditions: {conditions}</p>
            <p className="has-text-weight-semibold">Temp: {temp}</p>
            <p className="has-text-weight-semibold">Humidity: {humidity}</p>
            <p className="has-text-weight-semibold">Visibility: {visibility}</p>
        </div>
        
    </div>
    </div>
    
)
}

export default ProfileDetails