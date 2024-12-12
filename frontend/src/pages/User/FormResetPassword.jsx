import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import Header from '../../components/Header';
import axios from 'axios';
function FormResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const Navigate = useNavigate();
    const handleResetPassword = async () => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/user/newpassword', {
                password: newPassword,
                token: token
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);
            if (response.data.message == "All done") {
                alert("Password reset successfully");
            }
            // Handle successful password reset logic here
        } catch (error) {
            console.error(error);
            // Handle error logic here
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        // Handle password reset logic here, e.g., update the user's password in the database
        console.log('New password:', newPassword);
        handleResetPassword();
        // Clear form and error message
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        Navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 text-black p-4">
            <Header />
            <div className="bg-white p-8 rounded-lg w-full max-w-sm shadow-lg relative top-10">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Choose New Password</h2>
                <p className="text-black mb-6">
                    Almost done. Enter your new password and you're all set.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-black text-sm font-medium mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Enter new password'
                            className="bg-gray-100 border border-green-600 text-black text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-black text-sm font-medium mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder='Enter confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-100 border border-green-600 text-black text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
                            required
                        />
                    </div>

                    {passwordError && (
                        <div className="text-red-500 mb-4">{passwordError}</div>
                    )}

                    <button
                        type="submit"
                        className="text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="text-black text-sm text-center mt-4">
                    <Link to={'/user/login'} className="hover:underline text-green-400">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default FormResetPassword;
