import React, { useState } from 'react';
import {
  FaPaperclip,
  FaPaperPlane,
  FaImage,
  FaVideo,
  FaMicrophone,
} from 'react-icons/fa';

export default function ChatInput({ onSend, setTyping }) {
  const [input, setInput] = useState('');

  // Function to send the message
  const handleSend = () => {
    if (input.trim()) {
      onSend({ type: 'text', content: input, sender: 'self' });
      setInput(''); // Clear the input field
    }
  };

  // Function to handle Enter key for sending messages
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent line break
      handleSend();
    }
  };

  // Handle file uploads
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      onSend({ type, content: URL.createObjectURL(file), sender: 'self' });
    }
  };

  return (
    <div className="relative flex items-center p-4 bg-gray-100">
      {/* File Upload Options */}
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer text-gray-700 p-2">
          <FaImage size={20} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'image')}
          />
        </label>
        <label className="cursor-pointer text-gray-700 p-2">
          <FaVideo size={20} />
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'video')}
          />
        </label>
        <label className="cursor-pointer text-gray-700 p-2">
          <FaMicrophone size={20} />
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'audio')}
          />
        </label>
      </div>

      {/* Text Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setTyping(true); // Notify parent component about typing
          setTimeout(() => setTyping(false), 2000); // Simulate typing stop
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        className="flex-1 p-2 mx-2 border rounded-lg"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="bg-primary text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition"
      >
        <FaPaperPlane size={18} />
      </button>
    </div>
  );
}
