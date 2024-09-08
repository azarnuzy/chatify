import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { useRegister } from '@/hooks/auth/hook';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormError } from '@/components/ui/formerror';
import { TextField } from '@/components/ui/textfield';

import { ValidationSchemaRegister } from '@/utils/validations/auth';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate } = useRegister();

  const form = useForm<z.infer<typeof ValidationSchemaRegister>>({
    resolver: zodResolver(ValidationSchemaRegister),
    defaultValues: {
      username: '',
      password: '',
      email: ''
    }
  });

  async function onSubmit(data: z.infer<typeof ValidationSchemaRegister>) {
    try {
      setIsLoading(true);
      const payload = {
        name: data.username,
        email: data.email,
        password: data.password
      };

      mutate(payload, {
        onSuccess: () => {
          setIsLoading(false);
          toast.success('Register Success');
        },
        onError: (error) => {
          setIsLoading(false);
          setError(error?.response?.data.message || 'An error occurred');
          toast.error('Register Failed');
        }
      });
    } catch (error) {
      throw new Error('Invalid Response');
    }
  }

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid ">
            <FormError message={error as string} />
            <TextField
              type="text"
              variant="md"
              control={form.control}
              name="username"
              placeholder="Username"
              label="Username"
              status={form.formState.errors.username ? 'error' : 'none'}
              message={form.formState.errors.username?.message}
              required
            />
            <TextField
              type="text"
              variant="md"
              control={form.control}
              name="email"
              placeholder="Email"
              label="Email"
              status={form.formState.errors.email ? 'error' : 'none'}
              message={form.formState.errors.email?.message}
              required
            />
            <TextField
              type="password"
              variant="md"
              control={form.control}
              name="password"
              placeholder="Password"
              label="Password"
              status={form.formState.errors.password ? 'error' : 'none'}
              message={form.formState.errors.password?.message}
              required
            />
            <Button className="bg-primary-main text-white" variant={'default'} disabled={isLoading}>
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Register with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
