import { zodResolver } from '@hookform/resolvers/zod';
import EmojiPicker from 'emoji-picker-react'; // Assuming you have an emoji picker component
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { formatDate } from '@/lib/utils'; // Assuming you have the formatDate utility
import { useCreateNewMessage, useGetChatsById } from '@/hooks/chat/hook';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { ValidationSchemaChat } from '@/utils/validations/chat';

const ChatContent = () => {
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
    try {
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
    } catch (error) {
      throw new Error('An error occurred while sending the message');
    }
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

  // Handle emoji selection
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const updatedMessage = message + emojiObject.emoji;
    setMessage(updatedMessage); // Update message state
    form.setValue('message', updatedMessage); // Set the emoji in the form field
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center text-3xl">
        <FaSpinner className="mr-2 h-8 w-8 animate-spin text-3xl" />
        Loading...
      </div>
    );
  }

  if (!data) {
    return <div>No chat found.</div>;
  }

  const { partner, me, messages } = data.data; // Destructure chat data

  return (
    <div className="flex w-full flex-col">
      <div className="h-[50px] bg-white w-full  flex justify-between items-center px-5">
        <div className="flex gap-3 items-center">
          <Link to="/">
            <FaArrowLeft className="text-gray-500 text-2xl sm:hidden" />
          </Link>
          <Avatar className="bg-primary-500 text-white ">
            <AvatarFallback>{partner?.[0]?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="text-gray-800 text-lg font-semibold">{partner[0]?.name || 'Unknown Partner'}</h4>
            <p className="text-xs">Online</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pb-5 sm:mt-0 h-[calc(100vh-51.5px)] sm:h-[calc(100vh-51.5px-51.5px)] justify-between relative">
        <div
          className="flex flex-col gap-2 max-h-[calc(100vh-50px-60px)] sm:max-h-[calc(100vh-51.5px-50px-60px)] py-5 overflow-y-auto px-5"
          ref={containerRef}
        >
          {messages.map((item, i) => {
            const isMe = item.sender.id === me.id; // Check if the sender is the current user (me)

            return (
              <div key={i} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {/* Only show avatar for partner's messages */}
                {!isMe && (
                  <Avatar className="bg-primary-500 text-white">
                    <AvatarFallback>{partner[0]?.name?.[0] || 'U'}</AvatarFallback>
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
                  {/* Add a triangle shape for message bubbles */}
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

        {/* Message input field */}
        <div className="absolute bottom-0 min-h-[60px] w-full bg-white rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger>
                  <Button type="button" variant={'ghost'} className="text-2xl text-gray-500">
                    <BsEmojiSmile />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit border-none p-0">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </PopoverContent>
              </Popover>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Type a message"
                        className="resize-none border-none align-middle"
                        {...field}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} // Keep the message updated
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-fit text-xl" variant={'ghost'} type="submit">
                <BsSend />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
