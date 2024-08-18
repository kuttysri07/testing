import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const EditImage = ({ img }) => {

  const [name, setName] = useState(img.name);
  const [price, setPrice] = useState(img.price);
  const [description, setDescription] = useState(img.description);
  const [category,setCategory]=useState(img.category)
  const updateDescription = async () => {
   
    try {
      const response = await axios.put(`${API_URL}/updateImage/${img._id}`, {
        name,
        price,
        description,
        category
      });
      console.log('Updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }

   
  };

  return (
    <div>
      <button  data-bs-toggle="modal" data-bs-target={`#id${img._id}`}>
        Edit
      </button>

      <div className="modal fade" id={`id${img._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
                setName(img.name);
                setPrice(img.price);
                setDescription(img.description);
                setCategory(img.category);
              }}></button>
            </div>
            <div className="modal-body">
            <label for="fname">Name:</label><br />
              <input className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} type="text" />
              <label for="fname">Price:</label><br />
              <input className="form-control mb-2" value={price} onChange={e => setPrice(e.target.value)} type="text" />
              <label for="fname">Description:</label><br />
              <input className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} type="text" />
              <label for="category">Category</label><br />
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="sarees">Sarees</option>
                            <option value="shoes">Shoes</option>
                            <option value="shirts">Shirts</option>
                            <option value="electronics">Electronics</option>
                    </select> <br />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                setName(img.name);
                setPrice(img.price);
                setDescription(img.description);
                setCategory(img.category);
              }}>Close</button>
              <button type="button" className="btn btn-primary" onClick={updateDescription}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditImage;
