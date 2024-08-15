import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Editimage from '../Editimage';
import "./admin.css"

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {

    const [createproduct, setCreateProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: 'sarees' // default category
    });

    const handleChange = (e) =>{
        e.preventDefault();
        setCreateProduct({
            ...createproduct,
            [e.target.name]: e.target.value,
        });
    }

    const [file, setFile] = useState(null);

    const [images, setImages] = useState([]);


    // upload the image and text to server

    const uploadHandler = async () => {
        
        const formData = new FormData();
        formData.append("name", createproduct.name);
        formData.append("price", createproduct.price);
        formData.append("description", createproduct.description);
        formData.append("category", createproduct.category);
        formData.append("file", file);

    try {
        const response = await axios.post(`${API_URL}/upload`, formData)
        console.log(response.data);
        fetchImages();  // Fetch the updated list of images after a new upload
          // Reset form fields
        setCreateProduct({
            name: '',
            price: '',
            description: '',
            category: 'sarees' // Reset to the default category or choose as per your requirement
        });

        // Reset file input
        setFile(null);

      
    }
    catch(err){
       console.log({message:err.message});
    }

    }


    // get all data image and texts
    const fetchImages = () => {
       
        axios.get(`${API_URL}/getImage`)
       
        .then(res => {
            setImages(res.data);  // Set all images from the response data
        })
        .catch(err => console.log(err));
    }

    //delete one card

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`${API_URL}/deleteImage/${id}`);  // Ensure you're passing the id directly
            setImages(images.filter(img => img._id !== id));  // Use img._id instead of img.id
        } catch (err) {
            console.log({ message: err.message });
        }
    };

    useEffect(() => {
        fetchImages();
    }, [images]);

    return (
        <div>
           
                    <label for="fname">Name:</label><br />
                    <input type="text" id="fname" name="name" onChange={handleChange}  placeholder="Product Name "/><br />
                    <label for="lname">Price:</label><br />
                    <input type="text" id="lname" name="price" onChange={handleChange}  placeholder="Product Price " /><br />
                    <label for="lname">Description:</label><br />
                    <input type="text" id="lname" name="description" onChange={handleChange} placeholder="Product Description"  /><br />
                    
                    <label for="category">Category</label><br />
                    <select name="category" onChange={handleChange}>
                            <option value="sarees">Sarees</option>
                            <option value="shoes">Shoes</option>
                            <option value="shirts">Shirts</option>
                            <option value="electronics">Electronics</option>
                    </select> <br />
                    <label for="lname">Image:</label><br />
                  <input type='file' id="fileInput" onChange={(e) => setFile(e.target.files[0])} />

            
            <button onClick={uploadHandler}>Upload</button>
            <br/>         

            <div  className='AdminContainer'>
                {images.map((img, index) => (
                    <div className="cardcontainer" key={index}>     
                    <div className="photo">
                        <img src={`${API_URL}/${img.image}`} alt={img.name} />
                    </div>
                    <div className="description">
                        <h2>{img.name} </h2>
                        <h4>{img.category}</h4>
                        <h1>{img.price}</h1>
                        <p>{img.description}</p>
                       <Editimage img={img}/> 
                        <button onClick={()=>deleteHandler(img._id)} >Delete</button>
                    </div>
            </div>
                ))}
            </div>

        </div>
    );
}

export default App;
