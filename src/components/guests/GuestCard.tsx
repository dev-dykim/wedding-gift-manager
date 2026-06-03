import type { Guest, User } from '../../types';

interface GuestCardProps {
  guest: Guest;
  user: User;
  onToggleThanked: (id: string, thanked: boolean) => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
}

const categoryLabel: Record<string, string> = {
  dad: '아버지',
  mom: '어머니',
  me: '본인',
  unknown: '미분류',
};

export default function GuestCard({ guest, user, onToggleThanked, onEdit, onDelete }: GuestCardProps) {
  const isAdmin = user.role === 'admin';

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{guest.name}</span>
            <span className="text-xs bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded">
              {categoryLabel[guest.category]}
            </span>
            <span className="text-xs bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
              {guest.relation}
            </span>
          </div>
          <p className="text-lg font-bold text-sky-600">
            {guest.amount.toLocaleString()}원
          </p>
          {guest.memo && (
            <p className="text-xs text-gray-400 mt-1">{guest.memo}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onToggleThanked(guest.id, !guest.thanked)}
            className={`text-xs px-2 py-1 rounded-full ${
              guest.thanked
                ? 'bg-green-50 text-green-600'
                : 'bg-gray-50 text-gray-400'
            }`}
          >
            {guest.thanked ? '답례 완료' : '답례 미완'}
          </button>
          {isAdmin && (
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(guest)}
                className="text-xs text-gray-400 hover:text-sky-600"
              >
                수정
              </button>
              <button
                onClick={() => onDelete(guest.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
