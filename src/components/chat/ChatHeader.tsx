import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatHeaderProps {
  partner: {
    name: string | null;
  };
}

const ChatHeader = ({ partner }: ChatHeaderProps) => {
  return (
    <div className="h-[50px] bg-white w-full flex justify-between items-center px-5">
      <div className="flex gap-3 items-center">
        <Link to="/">
          <FaArrowLeft className="text-gray-500 text-2xl sm:hidden" />
        </Link>
        <Avatar className="bg-primary-500 text-white ">
          <AvatarFallback>{partner?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h4 className="text-gray-800 text-lg font-semibold">{partner?.name || 'Unknown Partner'}</h4>
          <p className="text-xs">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
