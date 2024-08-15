import React, { useEffect, useState } from 'react';
import "./card.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const Card = () => {

    const [products , setProducts] = useState([]);

    const fetchImages = () => {
        axios.get(`${API_URL}/getImage`)
        .then(res => {
            setProducts(res.data);  // Set all images from the response data
        })
        .catch(err => console.log(err));
    }

    useEffect(()=>{
        fetchImages();
    },[])


    return (
        
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
                           <Link to={`/getimage/${product.category}`}><button>Add to Cart</button></Link> 
                            <button>Wishlist</button>
                        </div>
                </div>
                ) 
            )}
        </div>
    );
};

export default Card;
