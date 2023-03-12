import express from "express";
import dbConfig from "./config/db";
import environmentVarables from "./config/environments";
import appConfig from "./app";

const app = express();
//Initalize App
appConfig(app);
//Initilize Database
dbConfig();
app.listen(environmentVarables.PORT, () => {
  console.log("Server Up ✌️✌️✌️");
});
