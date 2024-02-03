const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/CodeZone')
.then(()=>{
  console.log("conect to server .........")
}).catch(()=>console.log("Canot connect to server!!!"))

const courseRouter=require('./routes/courses.route');

//middleware enable me to read data in body request
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api/courses',courseRouter);


app.listen(5000, () => {
  console.log("listentig to pore 5000");
});
