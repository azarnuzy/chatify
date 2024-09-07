// src/components/ChatContent.js

import axios from 'axios';
import { useState } from 'react';

const messages = [
  { sender: 'User1', text: 'Hello there!' },
  { sender: 'User2', text: 'Hi! How are you?' },
  { sender: 'User1', text: 'I am doing well, thanks!' }
]; // Replace with dynamic data

const ChatContent = () => {
  const [message, setMessage] = useState('');
  const accessToken = localStorage.getItem('slack_access_token'); // Retrieve the stored token

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://slack.com/api/chat.postMessage',
        {
          channel: 'U07LFCS65C4', // Replace with the user ID or channel ID
          text: message
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="h-[calc(100vh-180px)] overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="text-sm text-gray-500">{message.sender}</div>
            <div className="p-4 bg-white rounded-lg shadow-md">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="my-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-3 sm:p-4 border rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=" bg-blue-500 text-white px-4 py-3 rounded-lg whitespace-nowrap" onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatContent;
