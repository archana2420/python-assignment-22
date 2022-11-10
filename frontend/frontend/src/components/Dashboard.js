import React ,{useEffect, useState} from "react";

const Dashboard = ()=>{
    const [products,setProducts] = useState([])
    const [error,setErrorMessage]=useState('')
useEffect(()=>{
    const getProducts = async()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        }
        const response = await fetch("/testing_api/",requestOptions)
        const data = await response.json()
        console.log(data)
        if(!response.ok){
            console.log("Smething went wrong")
        }
        else{
            setProducts(data)
        }
        // setData(reponse.json())
        // console.log(reponse.json())
    }
    getProducts()
},[])
return (
    <div>
        
    </div>
)
}

export default Dashboard