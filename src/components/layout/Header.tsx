import type { User } from '../../types';

interface HeaderProps {
  user: User;
  onSignOut: () => void;
}

const roleLabel: Record<string, string> = {
  admin: '관리자',
  dad: '아버지',
  mom: '어머니',
  me: '본인',
};

export default function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-sky-600">축의금 관리</h1>
        <p className="text-xs text-gray-500">
          {user.name} ({roleLabel[user.role]})
        </p>
      </div>
      <button
        onClick={onSignOut}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        로그아웃
      </button>
    </header>
  );
}
