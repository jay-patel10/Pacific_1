const express = require("express");  
const cors = require("cors");
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const options ={
  definition:{
    openapi:"3.0.0",
    info:{
      title : "Tutorials Api",
      version :"1.0.0",
      description : "Simple Express tutorial api"
    },
    servers:[
      {
        url : "http://localhost:8080",
      }
    ]},
    apis:["./app/routes/*.js"],
};

const specs = swaggerJsDoc(options)

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))


app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.all("*",(req,res,next)=>{
    const erro = new Error("can not find your url");
    erro.status = "fail";
    erro.statusCode = 404;

    next(erro);
  })


app.use ((error, req , res , next ) =>{
      error.statusCode = error.statusCode || 500 ;
      error.status = error.status || "error"
      res.status(error.statusCode).json({
        status : error.statusCode,
        message :error.message
      })
})

require("./app/routes/tutorial.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
