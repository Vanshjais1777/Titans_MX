import React, { useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EmailVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState('');
  const sendOTP = async () => {
    try {
      const otp = code.join('');
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/user/verifyotp',
        { email: email, otp: otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response) {
      // Handle success response
        localStorage.setItem('token',response.data.token);
        navigate('/user/form-reset-pass');
      console.log('OTP verified successfully');
    } else {
      // Handle error response
      console.log('Error verifying OTP:', data.error);
    }
  } catch (error) {
    console.log('Error sending OTP:', error);
  }
};

const handleChange = (element, index) => {
  if (isNaN(element.value)) return false;
  setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

  // Focus next input
  if (element.nextSibling) {
    element.nextSibling.focus();
  }
};

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 text-black p-4">
    <Header />
    <h1 className="text-2xl mb-4">Verify email</h1>
    <p className="mb-6">A verification code has been sent to you. Enter the Email and code below</p>
    <input
      className="w-full h-12 pl-4 pr-4 text-lg text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      type="email"
      name="email"
      value={email}
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
      onFocus={(e) => e.target.select()}
    /><br></br>
    <div className="flex space-x-2 mb-6">
      {code.map((data, index) => (
        <input
          className="w-12 h-12 text-center text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          name="code"
          maxLength="1"
          key={index}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md" onClick={() => sendOTP()}>Verify email</button>
    <div className="flex justify-between w-full mt-4 px-4 flex-wrap">
      <button className="text-gray-400 mb-2 w-full sm:w-auto">← Back to login</button>
      <button className="text-gray-400 mb-2 w-full sm:w-auto">Resend it</button>
    </div>
  </div>
);
};

export default EmailVerification;
