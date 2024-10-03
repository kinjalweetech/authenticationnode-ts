import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Construct the connection URL correctly without the DB_PORT
const dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAINNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dburl)
    .then(() => console.log("Database is Successfully Connected..."))
    .catch((error) => console.error("Database Connection Error..", error));
// Listen for the connection event
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });