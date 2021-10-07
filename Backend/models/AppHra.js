import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const appHraSchema = mongoose.Schema({
    appHra: Number,
    User_id: {type: ObjectId, ref: "User"},
    createdAt: Date,
    updatedAt: Date
});

export default mongoose.model('AppHra', appHraSchema)