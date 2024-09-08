import { LoginForm } from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your email and password to log in."
      linkText="Create an account"
      linkHref="/register"
      linkLabel="Register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
