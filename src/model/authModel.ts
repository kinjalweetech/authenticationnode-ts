// import mongoose, { model, Model, Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import UserSI, { UserI } from "../interface/authInterface";
// import ModelI from "../interface/ModelInterface";

// // Define the schema
// export default class userModel implements ModelI {
//   schema: Schema <any> = new Schema (
//     {
//       username: {
//         type:String,
//         require: true
//       },
//       email:{
//         type: String,
//         require: true,
//         unique: true
//       },
//       password: {
//         type: String,
//         require: true
//       }
//     }
    
// )
// model:Model<any, any> = model <UserSI> ("Authenticate",this.schema);
//   static findOne: any;
// };

import mongoose, { model, Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { UserI } from "../interface/authInterface";

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Add static methods directly to the schema if needed
userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create the model
const UserModel: Model<UserI> = model<UserI>("User1", userSchema);

export default UserModel;
