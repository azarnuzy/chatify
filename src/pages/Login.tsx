import { LoginForm } from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';

import MetaTags from '@/utils/meta-tags/MetaTags';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your email and password to log in."
      linkText="Create an account"
      linkHref="/register"
      linkLabel="Register"
    >
      <MetaTags
        description="Login to your account to chat with your friends and family. Chatify is a chat application that allows you to chat with your friends and ai chatbot in real-time."
        title="Login - Chatify"
        imageUrl="/login.png"
      />
      <LoginForm />
    </AuthLayout>
  );
}
