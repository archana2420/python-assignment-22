import React from "react";

const Pagination =({productsPerPage,totalProducts,paginate})=>{
    const pageNumbers = []

    for(let number = 1; number <= Math.ceil(totalProducts/productsPerPage);number++)
    {
        pageNumbers.push(number)
    }

    return(
        <nav className="pagination is-centered">
          
            <ul className="pagination-list">
                {pageNumbers.map((eachNumber)=>{
                    return (
                    <li key={eachNumber} >
                        <a href="#" onClick={()=>paginate(eachNumber)} className="pagination-link">{eachNumber}</a>
                    </li>
                    )
                    
                })}
            </ul>
        </nav>
    )
}

export default Pagination