import { GoogleGenerativeAI } from '@google/generative-ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSend } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import { z } from 'zod';

import { SECRET_KEY } from '@/lib/constant';

import SkeletonLoader from '@/components/loader/skeleton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { ValidationSchemaChat } from '@/utils/validations/chat';

const AiChatContent = () => {
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'bot'; message: string }[]>([]);
  const [loading, setLoading] = useState(false); // For "Sending..." state on the button
  const [fetching, setFetching] = useState(false); // To manage bot's response delay
  const containerRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI(SECRET_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const form = useForm<z.infer<typeof ValidationSchemaChat>>({
    resolver: zodResolver(ValidationSchemaChat),
    defaultValues: {
      message: ''
    }
  });

  // Function to handle the API call to Google Generative AI
  const generateResponse = async (userMessage: string) => {
    try {
      const result = await model.generateContent(userMessage);
      const response = await result.response.text();

      return response;
    } catch (error) {
      console.error('Failed to generate response:', error);
      toast.error('Failed to generate response');
      throw error;
    }
  };

  const onSubmit = async (data: z.infer<typeof ValidationSchemaChat>) => {
    const userMessage = data.message;

    // Display user's message immediately
    setChatHistory((prev) => [...prev, { type: 'user', message: userMessage }]);

    // Reset the form and stop loading button state
    form.reset();
    setLoading(false);

    // Start fetching bot response (with a simulated delay)
    setFetching(true);
    try {
      // Simulate a delay for bot response
      setTimeout(async () => {
        const botMessage = await generateResponse(userMessage);
        // Add bot's response to the chat history
        setChatHistory((prev) => [...prev, { type: 'bot', message: botMessage }]);
        setFetching(false);
      }, 1000); // 1 second delay before fetching bot's response
    } catch (error) {
      setFetching(false);
    }
  };

  // Function to scroll to the bottom of the chat after new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 0);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col w-full pb-5 sm:mt-0 h-[calc(100vh-51.5px)] sm:h-[calc(100vh-52.5px)] justify-between relative">
        <div
          className="flex flex-col gap-5 max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-51.5px-60px)] py-5 overflow-y-auto px-5"
          ref={containerRef}
        >
          {chatHistory.map((item, index) => (
            <div key={index} className={`flex gap-3 ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] shadow-xl ${
                  item.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-dark-gray-3 dark:text-light-white'
                }`}
              >
                {item.type === 'bot' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.message}</ReactMarkdown>
                ) : (
                  <p className="mr-3 mb-1 text-sm sm:text-base">{item.message}</p>
                )}

                {item.type === 'user' ? (
                  <div className="w-9 h-2 bg-primary-500 absolute top-0 -right-1 rounded-br-3xl"></div>
                ) : (
                  <div className="w-9 h-2 bg-white absolute top-0 -left-1 rounded-bl-3xl dark:bg-dark-gray-3"></div>
                )}
              </div>
            </div>
          ))}

          {/* Show Skeleton Loader when waiting for the bot response */}
          {fetching && <SkeletonLoader />}
        </div>

        {/* Message input and submission */}
        <div className="absolute bottom-0 min-h-[60px] w-full bg-white rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-fit text-xl" variant={'ghost'} type="submit" disabled={loading || fetching}>
                {loading ? 'Sending...' : <BsSend />}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AiChatContent;
