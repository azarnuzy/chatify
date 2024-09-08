import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormError } from '@/components/ui/formerror';
import { TextField } from '@/components/ui/textfield';

import { ValidationSchemaLogin } from '@/utils/validations/auth';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ValidationSchemaLogin>>({
    resolver: zodResolver(ValidationSchemaLogin),
    defaultValues: {
      password: '',
      email: ''
    }
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
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
