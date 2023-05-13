const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const port = 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

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
  education: {
    type: String,
    required: true,
  },
});

// model name should be singular starting with capital
const Merchant = mongoose.model("Merchant", MerchantsSchema);

// Made connection with database atalas

// MongoDB Connection String
const mongoURI = "mongodb+srv://sajid:VmSkQEeF3e2s9MGm@cluster0.davbvrm.mongodb.net/DB1?retryWrites=true&w=majority";
  

// Mongoose connection method
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect with MongoDB", error);
    process.exit(0);
  });

  const db = mongoose.connection;

// Handle connection errors
db.on('error', (error) => console.error('MongoDB connection error:', error));

// Close the MongoDB connection before terminating the server
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

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
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route3: Insert a new merchant record
app.post("/api/merchant", async (req, res) => {
  console.log(req.body)
  const { name, email, education } = req.body;
  try {
    const merchant = new Merchant({ name, email,education });
    const savedMerchant = await merchant.save();
    res.json(savedMerchant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route4: Update an existing merchant record
app.put("/api/merchants/:id", async (req, res) => {
  const { name, email, education } = req.body;
  try {
    const updatedMerchant = await Merchant.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name,
          email: email,
          education: education,
        },
      },
      { new: true }
    );
    res.json(updatedMerchant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route:5 Delete a record
app.delete("/api/merchants/:id", async (req, res) => {
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
