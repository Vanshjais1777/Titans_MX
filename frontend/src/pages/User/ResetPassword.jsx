import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import axios from 'axios';
function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/auth/user/passwordreset', {
      email
    });
    console.log(response.data);
    console.log('Reset password requested for:', email);
    navigate('/user/verify-email');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 min-h-screen flex items-center justify-center">
      <Header />
      <div className="bg-white p-8 rounded-lg w-full max-w-sm relative top-10">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <p className="mb-6">
          Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              className="bg-gray-200 border border-green-600 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          <a href="#" className="hover:underline text-green-400">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
