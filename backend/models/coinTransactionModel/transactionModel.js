import mongoose from "mongoose";

const transactions = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId},
    message: {type: String},
    tag: {type: String,enum:["Coin Debit","Coin Credit"]},
});

const transactionModel = mongoose.model("transactionModel",transaction);

export default transactionModel;