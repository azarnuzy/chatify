import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { connectSocket, disconnectSocket, socket } from '@/lib/socket';
import { useCreateNewChat, useGetAllUsers, useGetChatsByUser } from '@/hooks/chat/hook';

import ChatList from '@/components/chat/ChatList';
import NewChatDialog from '@/components/chat/NewChatDialog';

import { ValidationSchemaNewChat } from '@/utils/validations/chat';

import { TUser } from '@/types/users';

const SideChat = () => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]); // Store online users' IDs

  const form = useForm<z.infer<typeof ValidationSchemaNewChat>>({
    resolver: zodResolver(ValidationSchemaNewChat),
    defaultValues: {
      name: ''
    }
  });

  const [isLoadingCreateChat, setIsLoadingCreateChat] = useState<boolean>(false);
  const [recipient_id, setRecipientId] = useState<number>(0);

  const { mutate } = useCreateNewChat();
  const { data, isLoading, error } = useGetChatsByUser();
  const { data: userData } = useGetAllUsers();

  // Filter out users that are already part of an existing chat
  const filteredUsers = userData?.data?.filter((user: TUser) => {
    return !data?.data?.some((chat) => chat.partner.some((partner) => partner.id === user.id));
  });

  // Handle online users received from the WebSocket server
  useEffect(() => {
    connectSocket(); // Connect to the WebSocket server when component mounts

    // Listen for the 'onlineUsers' event from the server
    socket.on('onlineUsers', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users.map((user: { user_id: number }) => user.user_id)); // Extract user_ids
    });

    // Clean up by disconnecting the socket when the component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  const onSubmit = async (data: z.infer<typeof ValidationSchemaNewChat>) => {
    try {
      const payload = {
        name: data.name,
        type: 'personal',
        recipient_id: recipient_id
      };
      setIsLoadingCreateChat(true);
      await mutate(payload, {
        onSuccess: (data) => {
          setIsLoadingCreateChat(false);
          toast.success('Chat created successfully');
          form.reset();
          navigate(`/chat/${data.data.id}?recipient=${recipient_id}`);
        },
        onError: (error) => {
          setIsLoadingCreateChat(false);
          toast.error(error?.response?.data.message || 'An error occurred while creating the chat');
        }
      });
    } catch (error) {
      throw new Error('Invalid response');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-2 rounded-md px-4">
        <h3 className="">Messages</h3>
        <NewChatDialog
          userData={filteredUsers}
          form={form}
          onSubmit={onSubmit}
          setRecipientId={setRecipientId}
          isLoadingCreateChat={isLoadingCreateChat}
        />
      </div>

      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500 h-full flex items-center justify-center">Error loading chats: {error.message}</div>
      ) : (
        <ChatList chats={data?.data} onlineUsers={onlineUsers} />
      )}
    </div>
  );
};

export default SideChat;
