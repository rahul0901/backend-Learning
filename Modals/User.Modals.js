import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String,
    userPassword: String,
    userNumber: Number
})

export default mongoose.model("User", user)