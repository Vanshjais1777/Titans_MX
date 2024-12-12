import React, { useState } from 'react';
import { FaHome, FaEllipsisV, FaFileAlt, FaImage, FaVideo } from 'react-icons/fa';
import ChatInput from './ChatInput';
import { useNavigate } from 'react-router-dom';

export default function ChatWindow({ activeChat }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // For navigation

  const sendMessage = (message) => {
    if (message.content.trim()) {
      setMessages([...messages, { ...message, time: 'Now' }]);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-gradient-to-br from-green-50 via-white to-blue-50 shadow-lg rounded-lg">
      {/* Header */}
      <header className="p-4 border-b flex items-center bg-gradient-to-r from-green-600 to-teal-500 text-white relative">
        {/* Profile Picture */}
        <img
          src="src/assets/image-1.avif"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{activeChat}</h2>
          <p className="text-sm text-gray-200">Software Engineer • Online</p>
        </div>
        {/* Dropdown Menu */}
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-green-700"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FaEllipsisV size={18} />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              <ul>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                  <FaImage className="mr-2 text-black" />
                  Media Files
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                  <FaVideo className="mr-2 text-black" />
                  Shared Videos
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                  <FaFileAlt className="mr-2 text-black" />
                  Documents
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 bg-white text-teal-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 flex items-center transition"
        >
          <FaHome className="mr-2" />
          Home
        </button>
      </header>

      {/* Instruction Boxes */}
      {messages.length === 0 && (
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center space-x-4">
            <FaFileAlt className="text-green-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                Connect with Employers
              </h3>
              <p className="text-sm text-gray-600">
                Ask your queries directly in a professional manner.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center space-x-4">
            <FaVideo className="text-blue-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-blue-700">
                Use Professional Language
              </h3>
              <p className="text-sm text-gray-600">
                Maintain a professional tone while communicating.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
            <FaEllipsisV className="text-purple-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-purple-700">
                Secure Messages
              </h3>
              <p className="text-sm text-gray-600">
                All messages are end-to-end encrypted for your privacy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Content */}
      <div className="flex-1 p-4 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              msg.sender === 'self' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Profile Image */}
            <img
              src={
                msg.sender === 'self'
                  ? 'src/assets/image-2.avif'
                  : 'src/assets/image-1.avif'
              }
              alt="Profile"
              className="w-10 h-10 rounded-full mx-2"
            />

            {/* Message Content */}
            <div
              className={`max-w-sm p-3 rounded-2xl shadow-md ${
                msg.sender === 'self'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900'
              }`}
            >
              {msg.type === 'text' && (
                <div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className="block mt-1 text-xs text-gray-300">
                    {msg.time}
                  </span>
                </div>
              )}
              {msg.type === 'image' && (
                <div>
                  <img
                    src={msg.content}
                    alt="Sent"
                    className="rounded-lg max-w-full h-auto"
                  />
                  <span className="block mt-1 text-xs text-gray-300">
                    {msg.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="text-gray-500 animate-pulse ml-4">
            <div className="w-4 h-4 bg-gray-300 rounded-full inline-block mx-1"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full inline-block mx-1"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full inline-block mx-1"></div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={sendMessage} setTyping={setTyping} />
    </div>
  );
}


