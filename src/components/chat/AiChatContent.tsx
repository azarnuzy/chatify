import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSend } from 'react-icons/bs';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { ValidationSchemaChat } from '@/utils/validations/chat';

const messages = [
  {
    id: 1,
    message: 'Hello there! How are you?',
    speaker: 'bot',
    time: '12:00 PM'
  },
  {
    id: 2,
    message: 'Hi Alice! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:01 PM'
  },
  {
    id: 3,
    message:
      'Hey there! How can I help you today? let me know if you have any questions. Have a great day! See you soon! Goodbye! ',
    speaker: 'bot',
    time: '12:02 PM'
  },
  {
    id: 4,
    message:
      'Hola Amigo! How are you doing today? let me know if you have any questions. Have a great day! See you soon! Goodbye! Thanks! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:03 PM'
  },
  {
    id: 4,
    message:
      'Hola Amigo! How are you doing today? let me know if you have any questions. Have a great day! See you soon! Goodbye! Thanks! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:03 PM'
  },
  {
    id: 4,
    message:
      'Hola Amigo! How are you doing today? let me know if you have any questions. Have a great day! See you soon! Goodbye! Thanks! I am doing well, thanks! How about you? ',
    speaker: 'user',
    time: '12:03 PM'
  }
]; // Replace with dynamic data

const AiChatContent = () => {
  const [message] = useState('');

  const form = useForm<z.infer<typeof ValidationSchemaChat>>({
    resolver: zodResolver(ValidationSchemaChat),
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = () => {
    console.log(message);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [message]);

  const containerRef = useRef<HTMLDivElement>(null);

  // when user add message it will be scroll to bottom for the newest messages
  const scrollToBottom = () => {
    setTimeout(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col w-full pb-5 sm:mt-0 h-[calc(100vh-51.5px)] sm:h-[calc(100vh-52.5px)] justify-between relative">
        <div
          className="flex flex-col gap-5 max-h-[calc(100vh-50px-60px)] sm:max-h-[calc(100vh-51.5px-50px-60px)] py-5 overflow-y-auto  px-5 "
          ref={containerRef}
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.map((item, i) => {
            return (
              <div className={`flex gap-3 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`} key={i}>
                {i % 2 === 1 && (
                  <>
                    <div className="relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] bg-white dark:bg-dark-gray-3 dark:text-light-white shadow-xl">
                      <p className="mr-3 mb-1 text-sm sm:text-base">
                        {item?.message || 'Maaf saya tidak mengerti, tolong tanyakan beberapa saat lagi'}
                      </p>
                      <p className="text-[11px] text-dark-gray-3 text-end dark:text-light-white">{item.time}</p>
                      <div className="w-9 h-2 dark:bg-dark-gray-3 bg-white absolute top-0 -left-1 rounded-bl-3xl"></div>
                    </div>
                  </>
                )}
                {i % 2 === 0 && (
                  <>
                    <div className="relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] bg-white shadow-xl dark:bg-dark-gray-3 dark:text-light-white">
                      <p className="mr-3 mb-1 text-sm sm:text-base">{item?.message}</p>
                      <p className="text-[11px] text-dark-gray-3 text-end dark:text-light-white">{item.time}</p>
                      <div className="w-9 h-2 bg-white absolute top-0 -right-1 rounded-br-3xl dark:bg-dark-gray-3"></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 min-h-[60px] w-full bg-white rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormControl>
                      <Textarea
                        placeholder="Type a message"
                        className="resize-none border-none align-middle"
                        {...field}
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

export default AiChatContent;
