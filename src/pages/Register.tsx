import { RegisterForm } from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';

import MetaTags from '@/utils/meta-tags/MetaTags';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your email below to create your account."
      linkText="Already have an account?"
      linkHref="/login"
      linkLabel="Login"
    >
      <MetaTags
        description="Register to your account to chat with your friends and family. Chatify is a chat application that allows you to chat with your friends and ai chatbot in real-time."
        title="Register - Chatify"
        imageUrl="/register.png"
      />
      <RegisterForm />
    </AuthLayout>
  );
}
