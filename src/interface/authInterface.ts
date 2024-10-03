import mongoose, { Document } from "mongoose"
export interface UserI extends Document {
    name: string,
    email: string,
    password: string
}
export default interface UserSI extends UserI , mongoose.Document{}