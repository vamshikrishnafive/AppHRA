import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const hraSchema = mongoose.Schema({
    Bas: Number,
    LTA: Number,
    HRA: Number,
    FA: Number,
    Inv: Number,
    isMetroCity: Boolean,
    Med: Number,
    User_id: {type: ObjectId, ref: "User"},
    createdAt: Date,
    updatedAt: Date
});

export default mongoose.model('Hra', hraSchema)