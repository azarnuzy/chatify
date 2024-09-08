import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { contentTrimmed, formatDate } from '@/lib/utils';
import { useGetChatsByUser } from '@/hooks/chat/hook';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { TGetChatsByUser } from '@/types/chat';

const SideChat = () => {
  // Fetch chat data using the hook
  const { data, isLoading, error } = useGetChatsByUser();

  // Sort chats by the created_at date in descending order
  const sortedChats = data?.data?.sort((a: TGetChatsByUser, b: TGetChatsByUser) => {
    return new Date(b.latestMessage?.created_at).getTime() - new Date(a.latestMessage?.created_at).getTime();
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 h-full flex items-center justify-center">Error loading chats: {error.message}</div>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-2 rounded-md">
        <h3 className="px-4">Messages</h3>
      </div>
      <div className="flex flex-col gap-2">
        {sortedChats?.map((chat: TGetChatsByUser, index) => (
          <Link
            to={'/chat/' + chat.id}
            key={index}
            className="flex items-center gap-2 p-2 bg-white px-4 hover:bg-neutral-200 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <Avatar className="bg-primary-500 text-white">
              {/* Fallback to 'U' if the partner's name is not available */}
              <AvatarFallback>{chat.partner[0]?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">{chat.partner[0]?.name || 'Unknown Partner'}</h4>
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
            </div>
            {/* Display the time of the latest message */}
            <div className="text-sm text-gray-500">{chat.latestMessage ? formatDate(chat.created_at) : ''}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SideChat;
