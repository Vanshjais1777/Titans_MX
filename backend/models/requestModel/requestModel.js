import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  firstName:{
    type:String,
  },
  
  lastName:{
    type:String,
  }
});

const Company = mongoose.model('privateEmployer', companySchema);

export default Company;