import { Link } from 'react-router-dom';

import { contentTrimmed, formatDate } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { TGetChatsByUser } from '@/types/chat';

interface ChatListProps {
  chats: TGetChatsByUser[] | undefined;
  onlineUsers: number[]; // List of online user IDs
}

const ChatList = ({ chats, onlineUsers }: ChatListProps) => {
  if (!chats) return null;

  const sortedChats = chats?.sort((a, b) => {
    return new Date(b.latestMessage?.created_at).getTime() - new Date(a.latestMessage?.created_at).getTime();
  });

  return (
    <div className="flex flex-col gap-2">
      {sortedChats?.map((chat, index) => (
        <Link
          to={`/chat/${chat.id}?recipient=${chat.partner[0].id}`}
          key={index}
          className="relative flex items-center gap-2 p-2 bg-white px-4 hover:bg-neutral-200 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div className="relative">
            <Avatar className="bg-primary-500 text-white">
              <AvatarFallback>{chat.partner[0]?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <h4 className="font-semibold">{chat.partner[0]?.name || 'Unknown Partner'}</h4>
              <div className="text-sm text-gray-500">
                {chat.latestMessage ? formatDate(chat.latestMessage?.created_at) : ''}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500 hidden sm:block md:hidden">
                {/* Trimming the latest message content */}
                {contentTrimmed(chat.latestMessage?.content || 'No message yet', 22)}
              </p>
              <p className="text-sm text-gray-500 block sm:hidden">
                {contentTrimmed(chat.latestMessage?.content || 'No message yet', 35)}
              </p>
              <p className="text-sm text-gray-500 xl:hidden md:block hidden">
                {contentTrimmed(chat.latestMessage?.content || 'No message yet', 35)}
              </p>
              <p className="text-sm text-gray-500 hidden xl:block">
                {contentTrimmed(chat.latestMessage?.content || 'No message yet', 50)}
              </p>
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full ${onlineUsers.includes(chat.partner[0].id) ? 'bg-green-500' : 'bg-gray-300'}`}
                ></div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
