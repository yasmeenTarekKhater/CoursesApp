const express = require("express");
const app = express();
const courseRouter=require('./routes/courses.route');

//middleware enable me to read data in body request
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api/courses',courseRouter);


app.listen(5000, () => {
  console.log("listentig to pore 5000");
});
