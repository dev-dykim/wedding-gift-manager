import { useState } from 'react';

const EMAIL_DOMAIN = '@wedding.local';

interface LoginFormProps {
  onSignIn: (email: string, password: string) => Promise<{ error: unknown }>;
  onSignUp: (email: string, password: string, name: string) => Promise<{ error: unknown }>;
}

export default function LoginForm({ onSignIn, onSignUp }: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  function toEmail(id: string) {
    return id.includes('@') ? id : id + EMAIL_DOMAIN;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = toEmail(username.trim());

    if (isSignUp) {
      if (!name.trim()) {
        setError('이름을 입력해주세요.');
        setLoading(false);
        return;
      }
      if (!username.trim()) {
        setError('아이디를 입력해주세요.');
        setLoading(false);
        return;
      }
      const { error } = await onSignUp(email, password, name);
      if (error) {
        setError(String(error));
      } else {
        setSignUpSuccess(true);
      }
    } else {
      const { error } = await onSignIn(email, password);
      if (error) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    setLoading(false);
  }

  if (signUpSuccess) {
    return (
      <div className="text-center p-6">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-lg font-bold mb-2">회원가입 완료</h2>
        <p className="text-gray-500 text-sm mb-4">
          관리자 승인 후 이용할 수 있습니다.
        </p>
        <button
          onClick={() => { setSignUpSuccess(false); setIsSignUp(false); }}
          className="text-sky-600 text-sm underline"
        >
          로그인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="홍길동"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="아이디 입력"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="6자 이상"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg text-sm disabled:opacity-50"
      >
        {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
      </button>
      <p className="text-center text-sm text-gray-500">
        {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
        <button
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
          className="text-sky-600 underline"
        >
          {isSignUp ? '로그인' : '회원가입'}
        </button>
      </p>
    </form>
  );
}
