import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    password: String,
    createdAt: Date,
    updatedAt: Date
});

export default mongoose.model('User', userSchema)