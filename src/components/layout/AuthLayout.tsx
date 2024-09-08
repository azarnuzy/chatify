import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

interface AuthLayoutProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function AuthLayout({
  title,
  description,
  children,
  linkHref = '/login',
  linkLabel = 'Login'
}: AuthLayoutProps) {
  return (
    <>
      <div className="h-screen flex flex-col lg:grid lg:grid-cols-2 lg:max-w-none lg:px-0 justify-center">
        {/* Header for mobile devices */}
        <Link
          to={linkHref}
          className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
        >
          {linkLabel}
        </Link>

        {/* Left Section for larger screens */}
        <div className="relative hidden h-full lg:flex lg:flex-col bg-muted text-white p-10 dark:border-r">
          <div className="absolute inset-0 bg-primary-main" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <IoChatbubbleEllipsesOutline className="text-4xl mr-2" />
            <h3 className="font-medium">Chatify</h3>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo; Chatify is simple and easy to use. You can chat with your friends and family in real-time. Also
                you can chat with AI chatbot.&rdquo;
              </p>
              <footer className="text-sm">M. Azar Nuzy</footer>
            </blockquote>
          </div>
        </div>

        {/* Right Section for form */}
        <div className="flex flex-col justify-center p-6 sm:p-8 w-full max-w-md mx-auto lg:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {children}

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
