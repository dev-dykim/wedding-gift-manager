import { useLocation, useNavigate } from 'react-router-dom';
import type { User } from '../../types';

interface BottomNavProps {
  user: User;
}

export default function BottomNav({ user }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/list', label: '목록', icon: '📋' },
    { path: '/stats', label: '통계', icon: '📊' },
    ...(user.role === 'admin'
      ? [{ path: '/admin', label: '관리', icon: '⚙️' }]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs ${
              active ? 'text-sky-600 font-semibold' : 'text-gray-400'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
