const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const connectToMongo = require('./db.js');
connectToMongo();
const cors = require('cors');

const mainRouter = require('./Routes/index.js');





app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);
app.listen(PORT, ()=>{
    console.log("App Listening on port", PORT);
})



