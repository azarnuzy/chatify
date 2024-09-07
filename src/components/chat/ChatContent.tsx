// src/components/ChatContent.js

import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const messages = [
  {
    id: 1,
    message: 'Hello there! How are you?',
    speaker: 'bot',
    time: '12:00 PM'
  },
  {
    id: 2,
    message: 'Hi Alice! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:01 PM'
  },
  {
    id: 3,
    message:
      'Hey there! How can I help you today? let me know if you have any questions. Have a great day! See you soon! Goodbye! ',
    speaker: 'bot',
    time: '12:02 PM'
  },
  {
    id: 4,
    message:
      'Hola Amigo! How are you doing today? let me know if you have any questions. Have a great day! See you soon! Goodbye! Thanks! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:03 PM'
  }
]; // Replace with dynamic data

const ChatContent = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log(message);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="h-[50px] bg-white w-full  flex justify-between items-center px-5">
        <div className="flex gap-3 items-center">
          <Avatar className="bg-primary-500 text-white ">
            <AvatarFallback>{'A'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="text-gray-800 text-lg font-semibold">Arnold</h4>
            <p className="text-xs">Online</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pt-5 px-5 sm:mt-0 h-[calc(100vh-51.5px-50px)] justify-between">
        <div className="flex flex-col gap-5">
          {messages.map((item, i) => {
            return (
              <div className={`flex gap-3 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`} key={i}>
                {/* Bot Answer  */}
                {i % 2 === 1 && (
                  <>
                    <div className="relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] bg-white dark:bg-dark-gray-3 dark:text-light-white shadow-xl">
                      <p className="mr-3 mb-1 text-sm sm:text-base">
                        {item?.message || 'Maaf saya tidak mengerti, tolong tanyakan beberapa saat lagi'}
                      </p>
                      <p className="text-[11px] text-dark-gray-3 text-end dark:text-light-white">{item.time}</p>
                      <div className="w-9 h-2 dark:bg-dark-gray-3 bg-white absolute top-0 -left-1 rounded-bl-3xl"></div>
                    </div>
                  </>
                )}
                {/* User Input */}
                {i % 2 === 0 && (
                  <>
                    <div className="relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] bg-white shadow-xl dark:bg-dark-gray-3 dark:text-light-white">
                      <p className="mr-3 mb-1 text-sm sm:text-base">{item?.message}</p>
                      <p className="text-[11px] text-dark-gray-3 text-end dark:text-light-white">{item.time}</p>
                      <div className="w-9 h-2 bg-white absolute top-0 -right-1 rounded-br-3xl dark:bg-dark-gray-3"></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
