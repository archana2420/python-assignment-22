import React ,{useEffect, useState,useContext} from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { UserContext } from "../context/UserContext";
import Login from "./Login";
import axios from 'axios'


const Dashboard = ()=>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [productsPerPage,setProductsPerPage] = useState(200)
    const [searchProduct,setSearchProduct] = useState()
    const [showProduct,setShowProduct] = useState(true)
    
    
    useEffect(()=>{
        const fetchProducts = async ()=>{
            setLoading(true)
            const response = await axios.get('/api/get-products/')
            setProducts(response.data)
            // totalProductsFetched = response.data.length
            // console.log("total",totalProductsFetched)
            setLoading(false)
        }
        fetchProducts()
    },[])

    


const searchSpecificProduct = async()=>{
    await axios.post('/api/get-product/',{
        product_name:searchProduct
    }).then((response)=>{
        setProducts([response.data])
        console.log(response.data)
        console.log(products)
        
        setProductsPerPage(200)
        setShowProduct(true)
    }).catch((error)=>{
        setShowProduct(false)
    })
   
}

const findProduct =(e)=>{
    e.preventDefault()
    searchSpecificProduct()
}

const productList = products.map((product)=>{
    return (
        <div>
            <Product key={product.id} productDetails={product} />
            
        </div>
    )
})



const indexOfLastProduct = currentPage * productsPerPage
const indexOfFirstProduct = indexOfLastProduct - productsPerPage
const currentProducts = productList.slice(indexOfFirstProduct,indexOfLastProduct)

const paginate = (number)=>{
    setCurrentPage(number)
}

return (
    <div className="box ">
        
        
            <div className="title is-2 has-text-centered">Products</div>
        <Link to='/'>
        <div className="is-flex is-justify-content-center ">
        <button className="button is-primary ">Got to Profile Screen</button>
        </div>
        </Link>
       
        <div className="is-flex is-flex-wrap-wrap is-justify-content-center">
            <div className="is-flex is-flex-wrap-wrap is-justify-content-center">
            <form className="mt-4">
            <input className="input"  type="text" placeholder="Enter Product name" name={searchProduct} onChange={(e)=>{
                setSearchProduct(e.currentTarget.value)
                setShowProduct(true)
            }
                }></input>
                <div className="is-flex is-justify-content-center ">
                <button type="search" onClick={findProduct} className="button  is-primary is-small mt-3">Search</button>
                </div>
           
        </form>
            </div>
            </div>
           
        {/* {productList} */}
        {loading ?<h1 className="title is-2 has-text-centered">Loading...</h1>:showProduct?
        <div>
        <div className="is-flex is-justify-content-center is-flex-wrap-wrap ">
            {currentProducts}
            </div>
        <br></br>
        <div className="is-flex is-justify-content-center is-flex-wrap-wrap ">
        {/* <Pagination  productsPerPage={productsPerPage} totalProducts={productList.length} paginate={paginate}/> */}
                </div>
        </div>
            :<h1 className="title is-2 has-text-centered">Product not found</h1>
            }
           </div>
          
        
        
    
)
}

export default Dashboard