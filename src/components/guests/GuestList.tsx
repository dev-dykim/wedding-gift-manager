import type { Guest, User } from '../../types';
import GuestCard from './GuestCard';

interface GuestListProps {
  guests: Guest[];
  user: User;
  loading: boolean;
  onToggleThanked: (id: string, thanked: boolean) => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
  onQuickUpdate: (id: string, updates: Partial<Guest>) => void;
}

export default function GuestList({ guests, user, loading, onToggleThanked, onEdit, onDelete, onQuickUpdate }: GuestListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-3xl mb-2">📭</p>
        <p className="text-sm">등록된 축의금이 없습니다.</p>
      </div>
    );
  }

  const totalAmount = guests.reduce((sum, g) => sum + g.amount, 0);

  return (
    <div>
      <div className="px-4 py-2 flex justify-between text-sm text-gray-500">
        <span>총 {guests.length}명</span>
        <span className="font-semibold text-sky-600">{totalAmount.toLocaleString()}원</span>
      </div>
      <div className="space-y-2 px-4 pb-24">
        {guests.map((guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            user={user}
            onToggleThanked={onToggleThanked}
            onEdit={onEdit}
            onDelete={onDelete}
            onQuickUpdate={onQuickUpdate}
          />
        ))}
      </div>
    </div>
  );
}
