import React from "react";
import Header from "../../components/Header";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-200 flex items-center justify-center px-4">
            <Header />
            <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-lg relative top-10">
                <h2 className="text-2xl font-bold mb-2 text-black-300">Got an Idea? We've got the skills.</h2>
                <p className="mb-6 text-black">Tell us more about yourself and what you've got in mind.</p>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black" htmlFor="first-name">
                                First Name
                            </label>
                            <input
                                id="first-name"
                                type="text"
                                placeholder="Enter first name"
                                className="w-full bg-gray-200 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black" htmlFor="last-name">
                                Last Name
                            </label>
                            <input
                                id="last-name"
                                type="text"
                                placeholder="Enter last name"
                                className="w-full bg-gray-200 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            className="w-full bg-gray-200 rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="phone">
                            Phone Number
                        </label>
                        <div className="flex">
                            <select
                                className="bg-gray-200 rounded-l px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                                defaultValue="+91"
                            >
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                id="phone"
                                type="text"
                                placeholder="12345 67890"
                                className="w-full bg-gray-200 rounded-r px-3 py-2 text-sm text-blackblack focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            placeholder="Enter your message"
                            rows="4"
                            className="w-full bg-gray-200  rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
