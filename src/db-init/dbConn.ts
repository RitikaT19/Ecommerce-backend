import mongoose from "mongoose";


let database: mongoose.Connection;
export const createConnection = () => {
  // add your own uri below
  const uri: string = 'mongodb://127.0.0.1:27017/e-commerce';

  if (database) {
    return;
  }
  mongoose.connect(uri);
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
