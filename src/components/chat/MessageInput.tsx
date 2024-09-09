import EmojiPicker from 'emoji-picker-react';
import { UseFormReturn } from 'react-hook-form';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import { z } from 'zod';

import { socket } from '@/lib/socket'; // Import the socket instance

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { ValidationSchemaChat } from '@/utils/validations/chat';

interface MessageInputProps {
  form: UseFormReturn<z.infer<typeof ValidationSchemaChat>>;
  message: string;
  setMessage: (value: string) => void;
  onSubmit: (data: z.infer<typeof ValidationSchemaChat>) => void;
  recipientId: number; // Pass the recipient's ID
}

const MessageInput = ({ form, message, setMessage, onSubmit, recipientId }: MessageInputProps) => {
  // Handle emoji selection
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const updatedMessage = message + emojiObject.emoji;
    setMessage(updatedMessage); // Update message state
    form.setValue('message', updatedMessage); // Set the emoji in the form field
  };

  // Handle message submission
  const handleSendMessage = (data: z.infer<typeof ValidationSchemaChat>) => {
    console.log(data);
    // Emit the message via socket to the server
    socket.emit('sendMessage', { content: data.message, recipientId });

    // Call the form submit function
    onSubmit(data);
  };

  return (
    <div className=" min-h-[60px] w-full bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSendMessage)} className="flex gap-2 items-center">
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
                    onChange={(e) => {
                      field.onChange(e);
                      setMessage(e.target.value);
                    }} // Keep the message updated
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
  );
};

export default MessageInput;
