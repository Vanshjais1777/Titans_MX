import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import chatbotEmp from "../assets/chatbot-emp.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [currentFAQ, setCurrentFAQ] = useState(0);
  const [showCategories, setShowCategories] = useState(true);
  const API_KEY = "AIzaSyCEckqpho1EsIP5jYZ26PaGu6jkRDWHdww";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const faqs = [
    "What are the required qualifications for an internship?",
    "Do you offer remote internships?",
    "What is the duration of a typical internship?",
    "Are internships paid or unpaid?",
    "What are the main responsibilities during the internship?",
    "How do I apply for a job at your company?",
    "What skills are you looking for in a candidate?",
    "Do you provide mentorship or training during internships?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFAQ((prevFAQ) => (prevFAQ + 1) % faqs.length);
    }, 4000); // Change FAQ every 4 seconds

    return () => clearInterval(interval);
  }, []);

  async function run() {
    if (userInput.trim()) {
      let a = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/job/read-jobs");
      a = `${JSON.stringify(a.data.jobs)}`;
      const result = await model.generateContent(a + " " + userInput);
      const response = result.response;
      const text = response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userInput },
        { sender: "bot", text }
      ]);
      setHistory((prevHistory) => [...prevHistory, { text: userInput }]);
      setUserInput("");
      setShowCategories(false); // Hide categories after sending a message

      // Auto-scroll to bottom
      let chatbox = document.getElementById("chatbox");
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      run();
    }
  };

  return (
    <div className="flex justify-center bg-green-50 h-screen">
      {/* Main Chat Container */}
      <div className="w-full max-w-[90%] flex flex-col h-full rounded-xl shadow-lg bg-white">
        {/* Header Section */}
        <div className="p-6 bg-green-600 text-white flex justify-center items-center space-x-4">
          <span role="img" aria-label="Chatbot Emoji" className="text-4xl">
            🤖
          </span>
          <h1 className="text-xl font-bold">Ask Queries About Jobs & Internships!</h1>
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="flex flex-col w-1/3 bg-green-100 p-4">
            {/* History Section */}
            <div className="bg-green-200 p-4 rounded-md mb-4 h-1/3 overflow-y-auto shadow-md">
              <h2 className="text-lg font-bold mb-2 text-green-900">Conversation History</h2>
              <ul>
                {history.map((entry, index) => (
                  <li key={index} className="mb-2">
                    <p className="bg-green-300 p-2 rounded-lg shadow">{entry.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Display */}
            <div className="relative flex flex-col items-center">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold px-4 py-2 rounded-2xl shadow ${currentFAQ === index ? "opacity-100" : "opacity-0"
                    }`}
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`
                  }}
                >
                  <b>{faq}</b>
                </div>
              ))}
              <img
                src={chatbotEmp} alt="Chatbot Character"
                className="w-64 h-80 object-cover"
              />
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Categories */}
            {showCategories && (
              <div className="p-4 flex space-x-4 justify-center">
                <div
                  className="flex-1 bg-green-200 text-green-900 rounded-lg p-4 shadow cursor-pointer"
                  onClick={() => setUserInput("Tell me about internships")}
                >
                  <b>📘 Full-time/Part-time Internship Related Queries</b>
                </div>
                <div
                  className="flex-1 bg-green-200 text-green-900 rounded-lg p-4 shadow cursor-pointer"
                  onClick={() => setUserInput("Tell me about jobs")}
                >
                  <b>💼 Full-time/Part-time Jobs Related Queries</b>
                </div>
                <div
                  className="flex-1 bg-green-200 text-green-900 rounded-lg p-4 shadow cursor-pointer"
                  onClick={() => setUserInput("I need career guidance")}
                >
                  <b>🎓 Career Related Queries</b>
                </div>
              </div>
            )}

            {/* Messages */}
            <div id="chatbox" className="p-4 flex-1 overflow-y-auto bg-gray-100">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                    } mb-4`}
                >
                  <div
                    className={`p-4 rounded-3xl shadow ${msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-gradient-to-r from-purple-400 to-blue-400 text-white"
                      }`}
                  >
                    <b>{msg.text}</b>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="p-4 bg-green-100 flex items-center">
              <input
                id="userInput"
                type="text"
                className="flex-grow p-3 border rounded-full focus:outline-none bg-white text-black placeholder-gray-500 shadow-md"
                placeholder="Ask your queries?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="ml-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-300 hover:to-green-500"
                onClick={run}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
