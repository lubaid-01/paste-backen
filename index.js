const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

const paste = require('./Routers/paste.routes.js');
const user = require('./Routers/user.routes.js');
const connectDb = require('./config/db');
const anonUser = require("./middleware/anonUser.middleware");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv')

dotenv.config();

app.use(cors({
  origin: [
    "http://localhost:5173",             // Allow your local Vite dev server
    process.env.VERSEL_APP    // Allow your production Vercel app
  ],
  credentials: true // Enable this if you use cookies or sessions
}));
app.use(express.json());
app.use(cookieParser());   
app.use(anonUser); 
app.use("/user",user)
app.use("/paste",paste)


connectDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
