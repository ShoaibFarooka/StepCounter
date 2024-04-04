const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const UserRoutes = require("./routes/userRoutes");
// const ServiceRoutes = require("./routes/serviceRoutes")
// const RequestRoutes = require("./routes/requestRoutes")

//Express Server Setup
const app = express();
const port = process.env.PORT || 5001;

//Express Middlewares
app.use(express.json());
app.use(cors());

// Connection URL
const DB = process.env.DB_URI;
mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        //Server status endpoint
        app.get('/', (req, res) => {
            res.send('Server is Up!');
        });


        // Routes
        app.use("/users", UserRoutes);
        
        app.listen(port, () => {
            console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
