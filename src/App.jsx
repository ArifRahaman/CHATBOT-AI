// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// src/Chat.js

import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: newMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `,
          },
        }
      );

      const assistantMessage = response.data.choices[0].message;
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100 bg-gradient-to-r from-blue-400 to-purple-600">
    <h2 className="text-6xl py-3 ">AI CHATBOT</h2>
      <div className="w-5/6 flex flex-col justify-between p-6 bg-white rounded-lg shadow-md min-h-[70vh] max-h-[90vh]">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="messages space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${msg.role === "user"
                  ? "bg-blue-200 text-left"
                  : "bg-gray-200 text-right"
                  }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;