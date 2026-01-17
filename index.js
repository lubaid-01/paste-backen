const express = require('express')
const app = express()
const port = 3000

const paste = require('./Routers/paste.routes.js');
const user = require('./Routers/user.routes.js');
const connectDb = require('./config/db');
const anonUser = require("./middleware/anonUser.middleware");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());   
app.use(anonUser); 
app.use("/user",user)
app.use("/paste",paste)


connectDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
