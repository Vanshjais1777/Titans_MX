import mongoose from "mongoose";

const mentor = mongoose.Schema({
  userId:{type:mongoose.Types.ObjectId,unique:true,ref:"User Model"},
  mentorName:{type:String,required:true},
  email:{type:String,required:true},
  phoneNumber:{type: String, required:true},
  profileLink:{type: String, required:true},
  industry:{type:String,required:true},
  specialist:{type: Array},
  mentee:[{menteeId:{type : mongoose.Types.ObjectId,unqiue:true},status:{type:String,enum:["Accepted","Pending"],default:"Pending"}}],
  rating:{type: Number,default:0}
});

const mentorModel = mongoose.model("mentor",mentor);

export default mentorModel;