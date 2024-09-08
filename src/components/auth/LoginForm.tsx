import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { useLogin } from '@/hooks/auth/hook';
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormError } from '@/components/ui/formerror';
import { TextField } from '@/components/ui/textfield';

import { ValidationSchemaLogin } from '@/utils/validations/auth';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [, setToken] = useLocalStorage('token', null); // To store the token in localStorage
  const [, setUser] = useLocalStorage('user', null); // To store the user in localStorage
  const { login } = useAuth(); // To authenticate the user

  const { mutate } = useLogin();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ValidationSchemaLogin>>({
    resolver: zodResolver(ValidationSchemaLogin),
    defaultValues: {
      password: '',
      email: ''
    }
  });

  async function onSubmit(data: z.infer<typeof ValidationSchemaLogin>) {
    try {
      setIsLoading(true);
      mutate(data, {
        onSuccess: (data) => {
          setIsLoading(false);
          toast.success('Login Success');

          setToken(data.data.token);
          setUser(data.data.user);
          login(data.data);
          navigate('/');
        },
        onError: (error) => {
          setIsLoading(false);
          setError(error?.response?.data.message || 'An error occurred');
          toast.error('Login Failed');
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
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
