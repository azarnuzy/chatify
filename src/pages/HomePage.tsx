import ChatContent from '@/components/chat/ChatContent';
import SideChat from '@/components/chat/SideChat';
import Sidebar from '@/components/sidebar/Sidebar';

const HomePage = () => {
  return (
    <div className="flex">
      <div className="w-[50px] bg-neutral-200">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[calc(100vw-50px)]">
        <div className="h-[50px] bg-neutral-200  flex items-center">
          <h4>Chatify</h4>
        </div>
        <div className="flex h-[calc(100vh-50px)] flex-row border-2  shadow-md !rounded-md ">
          <div className="sm:w-[240px] lg:w-[360px] xl:w-[480px] py-4 flex flex-col  border-r-2 shadow-xl ">
            <SideChat />
          </div>
          <ChatContent />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
