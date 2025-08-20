// seedAdmin.js
import mongoose from 'mongoose'
import { connectDb } from './db/connectDb.js'
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

async function seedAdmin() {
  try {
  
    connectDb()
    
    const adminEmail = "admin@gmail.com";

    // check if admin already exists

    
    // create new admin
    const admin = new User({
      name: "Super Admin",
      email: adminEmail,
      password: "admin9090", // will be hashed by pre-save hook
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully:", adminEmail);
    
  } catch (error) {
    console.error("Error seeding admin:", error);
    
  }
  
   await mongoose.disconnect()
}

seedAdmin();