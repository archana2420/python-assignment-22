import React ,{useEffect, useState,useContext} from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

const Dashboard = ()=>{
    const [products,setProducts] = useState([])
    const [token] = useContext(UserContext)
    

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
        
    }
    getProducts()
},[])

const productList = products.map((product)=>{
    return (
        <div>
            <Product key={product.id} productDetails={product}/>
            
        </div>
    )
})


return (
    <div className="box ">
        
         <div>
            <div className="title is-2 has-text-centered">Products</div>
        <Link to='/'>
        <div className="is-flex is-justify-content-center">
        <button className="button is-primary ">Got to Profile Screen</button>
        </div>
        </Link>
        <div className="is-flex is-flex-wrap-wrap is-justify-content-center">
       
        
        {productList}
        </div>
            </div>
           
        
        
    </div>
)
}

export default Dashboard