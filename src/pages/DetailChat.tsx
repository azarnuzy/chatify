import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { socket } from '@/lib/socket'; // Import your socket instance
import { useCreateNewMessage, useGetChatsById } from '@/hooks/chat/hook';

import ChatHeader from '@/components/chat/ChatHeader';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';

import MetaTags from '@/utils/meta-tags/MetaTags';
import { ValidationSchemaChat } from '@/utils/validations/chat';

import { Message } from '@/types/chat'; // Assuming you have the correct Message type

const DetailChatPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const recipent_id = urlParams.get('recipient');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // State to manage messages
  const { roomId } = useParams();
  const { data, isLoading, error } = useGetChatsById(roomId as string); // Get chat data by roomId
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate } = useCreateNewMessage();

  const form = useForm<z.infer<typeof ValidationSchemaChat>>({
    resolver: zodResolver(ValidationSchemaChat),
    defaultValues: {
      message: ''
    }
  });

  if (data) {
    urlParams.set('recipient', data.data.partner[0].id.toString());
  }

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    socket.on('getMessage', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages state
    });

    return () => {
      socket.off('getMessage'); // Clean up listener on unmount
    };
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.data.messages); // Initialize with the fetched messages
    }
  }, [data]);

  const onSubmit = (data: z.infer<typeof ValidationSchemaChat>) => {
    const payload = {
      content: data.message,
      chat_id: Number(roomId)
    };

    mutate(payload, {
      onSuccess: (newMessage) => {
        form.reset();
        setMessage(''); // Reset message after sending
        const createdMessage = newMessage.data; // Assuming newMessage.data contains the created message

        setMessages((prevMessages) => [...prevMessages, createdMessage]); // Add the new message to the local state
        socket.emit('sendMessage', createdMessage, recipent_id); // Emit new message via WebSocket
      },
      onError: (error) => {
        toast.error(error?.response?.data.message || 'An error occurred while sending the message');
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to the bottom when new messages arrive

  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    setTimeout(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <FaSpinner className="mr-2 h-6 w-6 text-3xl animate-spin" />
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-red-500 h-full flex items-center justify-center">
        Error loading chats: {error?.message || 'An error occurred while getting the chat'}
      </div>
    );
  }

  const { partner, me } = data.data;

  return (
    <>
      <MetaTags
        description="Chat with your friends and family with ease. Send messages, emojis, and more."
        title="Chat - Chatify"
        imageUrl="/detail-chat.png"
      />
      <div className="flex w-full flex-col">
        <ChatHeader partner={partner[0]} />
        <div className="flex flex-col w-full sm:mt-0 h-[calc(100vh-51.5px-50px)] sm:h-[calc(100vh-51.5px-51.5px)] justify-between relative">
          <MessageList messages={messages} containerRef={containerRef} partner={partner[0]} me={me} />
          <MessageInput
            form={form}
            message={message}
            setMessage={setMessage}
            recipientId={Number(recipent_id)}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default DetailChatPage;
