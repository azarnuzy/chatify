import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useCreateNewMessage, useGetChatsById } from '@/hooks/chat/hook';

import ChatHeader from '@/components/chat/ChatHeader';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';

import { ValidationSchemaChat } from '@/utils/validations/chat';

const DetailChatPage = () => {
  const [message, setMessage] = useState('');
  const { roomId } = useParams();
  const { data, isLoading, refetch } = useGetChatsById(roomId as string); // Get chat data by roomId
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate } = useCreateNewMessage();

  const form = useForm<z.infer<typeof ValidationSchemaChat>>({
    resolver: zodResolver(ValidationSchemaChat),
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = (data: z.infer<typeof ValidationSchemaChat>) => {
    const payload = {
      content: data.message,
      chat_id: Number(roomId)
    };
    mutate(payload, {
      onSuccess: () => {
        form.reset();
        setMessage(''); // Reset message after sending
        refetch(); // Refetch the chat data to get the latest messages
      },
      onError: (error) => {
        toast.error(error?.response?.data.message || 'An error occurred while sending the message');
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]); // Scroll to the bottom when new messages arrive

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
    return <div className="h-full flex justify-center items-center text-3xl">Loading...</div>;
  }

  if (!data) {
    return <div>No chat found.</div>;
  }

  const { partner, me, messages } = data.data;

  return (
    <div className="flex w-full flex-col">
      <ChatHeader partner={partner[0]} />
      <div className="flex flex-col w-full pb-5 sm:mt-0 h-[calc(100vh-51.5px)] sm:h-[calc(100vh-51.5px-51.5px)] justify-between relative">
        <MessageList messages={messages} containerRef={containerRef} partner={partner[0]} me={me} />
        <MessageInput form={form} message={message} setMessage={setMessage} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default DetailChatPage;
