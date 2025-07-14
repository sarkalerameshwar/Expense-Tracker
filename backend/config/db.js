import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/Expence-App");
    console.log("MongoDB Connected");

  }catch(error){
    console.log(error.message);
  }
};

export default connectDB;
