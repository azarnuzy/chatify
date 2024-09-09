import MetaTags from '@/utils/meta-tags/MetaTags';

const HomePage = () => {
  return (
    <div className="p-4">
      <MetaTags
        description="Chatify is a chat application that allows you to chat with your friends and ai chatbot in real-time."
        title="Chatify - Chat with Friends and AI Chatbot"
        imageUrl="/homepage.png"
      />
      <div className="flex justify-center items-center flex-col h-full">
        <div className="py-5 px-4 rounded-lg bg-dark-600 text-white">
          <h2 className="text-center">Welcome to Chatify</h2>
          <h4 className="text-center">
            Chatify is a chat application that allows you to chat <br /> with your friends and ai chatbot in real-time.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
