import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const Products = () => {
    const { category } = useParams();
    const [products , setProducts] = useState([]);

    const fetchItems = () =>{
        axios.get(`${API_URL}/getImage/${category}`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err.message))
    }

    useEffect(()=>{
        fetchItems();
    },[category])

  return (
    <div>
         <div className='Container'>
            {products.map((product,index)=>(
                    <div className="cardcontainer" key={index}>     
                        <div className="photo">
                            <img src={`${API_URL}/${product.image}`} alt={product.name} />
                        </div>
                        <div className="description">
                            <h2>{product.name} </h2>
                            <h4>{product.category}</h4>
                            <h1>{product.price}</h1>
                            <p>{product.description}</p>
                           <button>Add to Cart</button>
                            <button>Wishlist</button>
                        </div>
                </div>
                ) 
            )}
        </div>
    </div>
  )
}

export default Products