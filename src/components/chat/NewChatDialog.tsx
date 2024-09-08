import { Check, ChevronsUpDown } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ValidationSchemaNewChat } from '@/utils/validations/chat';

import { TUser } from '@/types/users';

interface NewChatDialogProps {
  userData: TUser[] | undefined;
  form: UseFormReturn<z.infer<typeof ValidationSchemaNewChat>>;
  onSubmit: (data: z.infer<typeof ValidationSchemaNewChat>) => Promise<void>;
  setRecipientId: (id: number) => void;
  isLoadingCreateChat: boolean;
}

const NewChatDialog = ({ userData, form, onSubmit, setRecipientId, isLoadingCreateChat }: NewChatDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all duration-300 ease-in-out">
          New Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Message</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Choose User</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[380px] sm:w-[450px]  justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? userData?.find((item: TUser) => item.name === field.value)?.name
                            : 'Select user'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[380px] sm:w-[450px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {userData?.map((user: TUser) => (
                              <CommandItem
                                value={user.name}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue('name', user.name);
                                  setRecipientId(user.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    user.name === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {user.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-primary-main text-white"
              variant={'default'}
              disabled={isLoadingCreateChat}
            >
              {isLoadingCreateChat && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Create Chat
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
