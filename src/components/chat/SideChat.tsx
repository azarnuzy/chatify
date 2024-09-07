// src/components/SideChat.js
import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const userLists = [
  {
    id: 1,
    name: 'Alice',
    message: 'Hello there! How are you?',
    time: '12:00 PM'
  },
  {
    id: 2,
    name: 'Bob',
    message: 'Hi Alice! I am doing well, thanks!',
    time: '12:01 PM'
  },
  {
    id: 3,
    name: 'Charlie',
    message: 'Hey there!',
    time: '12:02 PM'
  },
  {
    id: 4,
    name: 'David',
    message: 'Hola Amigo!',
    time: '12:03 PM'
  }
];

const SideChat = () => {
  return (
    <>
      <div className="flex justify-between mb-2 rounded-md">
        <h3 className="px-4">Messages</h3>
      </div>
      <div className="flex flex-col gap-2">
        {userLists.map((user, index) => (
          <Link
            to={'/chat/' + user.id}
            key={index}
            className="flex items-center gap-2 p-2 bg-white px-4 hover:bg-neutral-200 transition-all duration-300 ease-in-out cursor-pointer "
          >
            <Avatar className="bg-primary-500 text-white">
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-500">{user.message}</p>
            </div>
            <div className="text-sm text-gray-500">{user.time}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SideChat;
