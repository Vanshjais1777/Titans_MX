import mongoose from "mongoose";

const mentee = mongoose.Schema({
    userId : {type: mongoose.Types.ObjectId,unique:true,ref:"user id"},
    mentor: [{mentorId:{type:mongoose.Types.ObjectId,ref:"mentor id"},status:{type:String,enum:["Accepted","Pending","Rejected"],default:"Pending"}}]
});

const menteeModel = mongoose.model("mentee",mentee);
export default menteeModel;