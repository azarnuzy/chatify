import { RegisterForm } from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your email below to create your account."
      linkText="Already have an account?"
      linkHref="/login"
      linkLabel="Login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
