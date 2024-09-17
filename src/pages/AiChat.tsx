import AiChatContent from '@/components/chat/AiChatContent';

import MetaTags from '@/utils/meta-tags/MetaTags';

const AiChat = () => {
  return (
    <>
      <MetaTags
        description="Chatify AI Chatbot is a chatbot that can help you chat with your friends, family, or anyone else. It is a chatbot that can help you chat with your friends, family, or anyone else."
        imageUrl="/ai-chat.png"
        title="AI Chatbot - Chatify"
      />

      <AiChatContent />
    </>
  );
};

export default AiChat;
