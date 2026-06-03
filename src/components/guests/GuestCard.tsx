import { useState } from 'react';
import type { Guest, User, Category, Relation } from '../../types';

interface GuestCardProps {
  guest: Guest;
  user: User;
  onToggleThanked: (id: string, thanked: boolean) => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
  onQuickUpdate: (id: string, updates: Partial<Guest>) => void;
}

const categoryLabel: Record<string, string> = {
  dad: '아버지',
  mom: '어머니',
  me: '본인',
  common: '공통',
  unknown: '미분류',
};

const categoryColor: Record<string, string> = {
  dad: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  mom: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
  me: 'bg-green-50 text-green-600 hover:bg-green-100',
  common: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
  unknown: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
};

const relationColor: Record<string, string> = {
  '친척': 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  '직장': 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
  '친구': 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
  '교회': 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  '기타': 'bg-gray-50 text-gray-500 hover:bg-gray-100',
};

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'dad', label: '아버지' },
  { value: 'mom', label: '어머니' },
  { value: 'me', label: '본인' },
  { value: 'common', label: '공통' },
  { value: 'unknown', label: '미분류' },
];

const relationOptions: { value: Relation; label: string }[] = [
  { value: '친척', label: '친척' },
  { value: '직장', label: '직장' },
  { value: '친구', label: '친구' },
  { value: '교회', label: '교회' },
  { value: '기타', label: '기타' },
];

export default function GuestCard({ guest, user, onToggleThanked, onEdit, onDelete, onQuickUpdate }: GuestCardProps) {
  const isAdmin = user.role === 'admin';
  const [editingField, setEditingField] = useState<'category' | 'relation' | null>(null);

  function handleQuickChange(field: 'category' | 'relation', value: string) {
    onQuickUpdate(guest.id, { [field]: value });
    setEditingField(null);
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-gray-900">{guest.name}</span>
            {editingField === 'category' && isAdmin ? (
              <select
                value={guest.category}
                onChange={(e) => handleQuickChange('category', e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="text-xs border border-sky-300 rounded px-1 py-0.5 bg-white focus:outline-none"
              >
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <button
                onClick={() => isAdmin && setEditingField('category')}
                className={`text-xs px-1.5 py-0.5 rounded ${categoryColor[guest.category] || 'bg-gray-50 text-gray-500'} ${isAdmin ? 'cursor-pointer' : ''}`}
              >
                {categoryLabel[guest.category]}
              </button>
            )}
            {editingField === 'relation' && isAdmin ? (
              <select
                value={guest.relation}
                onChange={(e) => handleQuickChange('relation', e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none"
              >
                {relationOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <button
                onClick={() => isAdmin && setEditingField('relation')}
                className={`text-xs px-1.5 py-0.5 rounded ${relationColor[guest.relation] || 'bg-gray-50 text-gray-500'} ${isAdmin ? 'cursor-pointer' : ''}`}
              >
                {guest.relation}
              </button>
            )}
          </div>
          <p className="text-lg font-bold text-sky-600">
            {guest.amount.toLocaleString()}원
          </p>
          {guest.memo && (
            <p className="text-xs text-gray-500 mt-1 bg-gray-50 px-2 py-1 rounded">{guest.memo}</p>
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
