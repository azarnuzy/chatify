import { Link } from 'react-router-dom';

import { contentTrimmed, formatDate } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { TGetChatsByUser } from '@/types/chat';

interface ChatListProps {
  chats: TGetChatsByUser[] | undefined;
}

const ChatList = ({ chats }: ChatListProps) => {
  if (!chats) return null;

  const sortedChats = chats.sort((a, b) => {
    return new Date(b.latestMessage?.created_at).getTime() - new Date(a.latestMessage?.created_at).getTime();
  });

  return (
    <div className="flex flex-col gap-2">
      {sortedChats.map((chat: TGetChatsByUser, index: number) => (
        <Link
          to={'/chat/' + chat.id}
          key={index}
          className="flex items-center gap-2 p-2 bg-white px-4 hover:bg-neutral-200 transition-all duration-300 ease-in-out cursor-pointer w-full"
        >
          <Avatar className="bg-primary-500 text-white">
            <AvatarFallback>{chat.partner[0]?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <h4 className="font-semibold">{chat.partner[0]?.name || 'Unknown Partner'}</h4>
              <div className="text-sm text-gray-500">
                {chat.latestMessage ? formatDate(chat.latestMessage?.created_at) : ''}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {contentTrimmed(chat.latestMessage?.content || 'No message yet', 35)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
