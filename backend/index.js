const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer =require("multer");

const path = require("path");


const productModel = require("./Model/productModel");

app.use(cors());
app.use(express.json());
app.use(express.static('public/images'))
app.use(express.static(path.join(__dirname, 'frontend/build')));

mongoose.connect("mongodb+srv://curljhonson07:Kuttysri07@todoapp.mrxzsi4.mongodb.net/image")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post("/upload",upload.single('file'), async (req,res)=>{

    try {
        const { name, price, description ,category} = req.body;

        const item = new productModel({name, price, description ,category, image:req.file.filename});

        const savedItem = await item.save();

        res.status(200).json({ message: 'Item saved successfully!', item: savedItem });
        
      
    } catch (error) {
        res.status(500).json({ message: 'Error saving item', error });
    }
    
});


app.get("/getImage", (req, res) => {
    productModel.find()
    .then(result => res.json(result))  // Send the result back to the frontend
    .catch(err => res.status(500).json({ error: err.message }));

});
app.get("/getImage/:category", async (req,res)=>{
    const {category} = req.params;
    try {
        const shoesProducts = await productModel.find({ category: category });
        res.json(shoesProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


app.put("/updateImage/:id",async (req,res)=>{
    const {id} = req.params;
    const {name, price, description,category}=req.body;
    try {
      const updateImage = await productModel.findByIdAndUpdate(
        id,
        {name,price,description , category},
        {new: true}
      )
      res.json(updateImage);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
  
})


app.delete("/deleteImage/:id",async (req,res)=>{
    const {id} = req.params;
    const {name, price, description,category}=req.body;
    try {
      const DeleteImage = await productModel.findByIdAndDelete(
        id,
        {name,price,description,category},
        {new: true}
      )
      res.json({message:"item was deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
  
})


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});




const Port = 8000;
app.listen(Port ,()=>{
    console.log(`server is running on port ${Port}`)
   
    
})