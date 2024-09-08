import { formatDate } from '@/lib/utils';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[]; // Replace with proper type
  containerRef: React.RefObject<HTMLDivElement>;
  partner: {
    name: string | null;
  };
  me: {
    id: number;
  };
}

const MessageList = ({ messages, containerRef, partner, me }: MessageListProps) => {
  return (
    <div
      className="flex flex-col gap-2 max-h-[calc(100vh-50px-60px)] sm:max-h-[calc(100vh-51.5px-50px-60px)] py-5 overflow-y-auto px-5"
      ref={containerRef}
    >
      {messages.map((item, i) => {
        const isMe = item.sender.id === me.id;

        return (
          <div key={i} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
            {!isMe && (
              <Avatar className="bg-primary-500 text-white">
                <AvatarFallback>{partner?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`relative p-1.5 rounded-xl max-w-[70%] sm:max-w-[80%] shadow-xl ${
                isMe ? 'bg-primary-500 text-white' : 'bg-white text-black'
              }`}
            >
              <p className="mr-3 mb-1 text-sm sm:text-base">{item?.content || 'No content'}</p>
              <p className={`text-[11px] ${isMe ? 'text-white' : 'text-gray-500'} text-end`}>
                {formatDate(item.created_at)}
              </p>
              {isMe ? (
                <div className="w-9 h-2 bg-primary-500 absolute top-0 -right-1 rounded-br-3xl"></div>
              ) : (
                <div className="w-9 h-2 bg-white absolute top-0 -left-1 rounded-bl-3xl"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
