import { sendEmail } from './../mailControllers/mailController.js';
import User from './../../models/authModel/user/userAuthModel.js';
import Company from '../../models/requestModel/requestModel.js';
import bcrypt from 'bcrypt';
export const sendRequest = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const { email, phone, companyName, firstName, lastName } = req.body;
    // Create a new company instance using the data
    const company = new Company({
      email,
      companyName,
      mobileNumber: phone,  // Ensure the field name matches the schema
      firstName,
      lastName
    });

    // Save the company instance to the database
    await company.save();

    // Log success message (optional)
    console.log("Company request saved successfully");

    // Find a user with the role 'govt'
    const user = await User.findOne({ role: 'govt' });
    if (!user) {
      return res.status(500).json({ message: "Something went wrong: Govt user not found" });
    }

    // Send an email to the 'govt' user about the new company request
    sendEmail(
      email, 
      "New Request Received", 
      `A new Private Company request to become a job provider has been received. Here are the details:\n\n
      Name: ${firstName} ${lastName}\n
      Email: ${email}\n
      Company Name: ${companyName}\n
      Mobile Number: ${phone}`
    );

    // Respond with a success message
    return res.status(200).json({ message: "Request sent successfully", success: true });
  } catch (e) {
    // Handle errors and send a failure response
    console.error(e);
    return res.status(500).json({ message: "Something went wrong", error: e.message });
  }
};

export const acceptRequest = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(500).json({ message: "Something went wrong user" });
        const company = await Company.findOne({ email });
        if (!company) return res.status(500).json({ message: "Something went wrong compnay" });
        let hpassword = await bcrypt.hash(password,10);
        console.log("object");
        const user2 = new User({
            firstName: company.firstName,
            lastName: company.lastName,
            email: company.email,
            phone: company.mobileNumber,
            password:hpassword,
            role:"employer",
            username:company.companyName
            
        });
        await user2.save();
        
        sendEmail(company.email, "Request Accepted!", `Your request for approval has been accepted. The details are: Email: ${email} Password: ${password} Company Name: ${company.companyName} Mobile Number: ${company.mobileNumber} Name: ${company.name}`);
        return res.status(200).json({ message: "Request Accepted Successfully", success: true });

    } catch (e) {
        return res.status(500).json({ message: "Something went wrong", e });

    }
};

export const rejectRequest = async (req, res) => {
    const { email, reason } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(500).json({ message: "Something went wrong user" });

        await Company.findOneAndDelete({ email });
        sendEmail(email, "Request Rejected!", `Your request for approval has been rejected`);
        return res.status(200).json({ message: "Request Rejected Successfully", success: true });

    } catch (e) {
        return res.status(500).json({ message: "Something went wrong", e });

    }
};

export const getRequest = async (req, res) => {
  try{
    const data = await Company.find();
    return res.status(200).json(data);
  }catch(e){
    return res.status(500).json(e);
  }
};