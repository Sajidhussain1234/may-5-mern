const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const cors = require("cors");

const port = 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

//======================== Start Database ========================

// Schema for merchants
const MerchantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// model name should be singular starting with capital
const Merchant = mongoose.model("Merchant", MerchantsSchema);

const mongoURI =  "mongodb+srv://sajid:5umzUY2v82s83lUF@cluster0.davbvrm.mongodb.net/DB1?retryWrites=true&w=majority";

// Made connection with database atalas
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//======================== Creating Routes ========================

// Route1: Gets all merchants records
app.get("/api/merchants", async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.json(merchants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route2: Get single merchant record
app.get("/api/merchants/:id", async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    res.json(merchant);
  } 
  catch (error) {
        res.status(500).send(error);
  }
});

// Route3: Insert a new merchant record
  app.post('/api/merchant', async(req, res)=>{
    const {name, email} = req.body;
    try {
        const merchant = new Merchant({ name, email });
        const savedMerchant = await merchant.save();
        res.json(savedMerchant);
    } catch (error) {
        res.status(500).send(error);
    }
  });

  // Route4: Update an existing merchant record
  app.put('/api/merchants/:id', async(req, res)=>{
    const {name, email} = req.body;
    try {
        const updatedMerchant = await Merchant.findByIdAndUpdate(req.params.id, 
            { $set: 
                {
                   'name': name,
                   'email': email
                }            
            }, 
        { new: true }    
        )
        res.json(updatedMerchant);
    } catch (error) {
        res.status(400).send(error);
    }
  });


// Route:5 Delete a record 
app.delete("/api/merchant/:id", async (req, res) => {
  try {
    // Find the merchant whose want to delete.
    const deletedMerchant = await Merchant.findByIdAndDelete(req.params.id);
    if (!deletedMerchant) return res.status(404).send(error);
    //  merchant is deleted
    res.json(deletedMerchant);
  } catch (error) {
    // console.error(error.message);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server started successfully on port number ${port}`);
});
