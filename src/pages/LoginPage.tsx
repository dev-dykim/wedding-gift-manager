import LoginForm from '../components/auth/LoginForm';

interface LoginPageProps {
  onSignIn: (email: string, password: string) => Promise<{ error: unknown }>;
  onSignUp: (email: string, password: string, name: string) => Promise<{ error: unknown }>;
}

export default function LoginPage({ onSignIn, onSignUp }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-sky-600">축의금 관리</h1>
          <p className="text-sm text-gray-400 mt-1">가족 축의금 관리 서비스</p>
        </div>
        <LoginForm onSignIn={onSignIn} onSignUp={onSignUp} />
      </div>
    </div>
  );
}
