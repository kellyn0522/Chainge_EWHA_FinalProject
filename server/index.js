const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const itemRoute = require("./Routes/itemRoute");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const reqRoute = require("./Routes/reqRoute");

const messageRoute = require("./Routes/messageRoute");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use("/api/items", itemRoute);
app.use("/api/users", userRoute);
app.use("/api/chats" , chatRoute);
app.use("/api/itemReq" , reqRoute);
app.use("/api/messages" , messageRoute);
app.use("/uploads", express.static('uploads'));

app.get("/", (req,res) =>{ 
    res.send("welcome to our chat app APIS ... ");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port,(req,res) =>{
    console.log(`Server running on port:${port}`);
});

mongoose.connect(uri).then(() => console.log("MongoDB connection established")).catch((error) => console.log
("MongoDO connection failed:", error.message));