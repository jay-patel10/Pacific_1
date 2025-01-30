const express = require("express");
const cors = require("cors");

const app = express();

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// app.use(express)
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
        url : "http://localhost:8080"
      }
    ]},
    apis:["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))


app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/error",(req,res)=>{
  try {
    const user = getUser();
    if(!user){
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message);
  }
})

require("./app/routes/tutorial.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
