import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { User, Role } from '../../types';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setUsers(data as User[]);
    setLoading(false);
  }

  async function approveUser(id: string) {
    await supabase.from('users').update({ approved: true }).eq('id', id);
    fetchUsers();
  }

  async function changeRole(id: string, role: Role) {
    await supabase.from('users').update({ role }).eq('id', id);
    fetchUsers();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((u) => (
        <div
          key={u.id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-gray-900">{u.name}</span>
              <span className="text-xs text-gray-400 ml-2">{u.email}</span>
            </div>
            {!u.approved && (
              <button
                onClick={() => approveUser(u.id)}
                className="text-xs bg-sky-500 text-white px-3 py-1 rounded-full"
              >
                승인
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={u.role}
              onChange={(e) => changeRole(u.id, e.target.value as Role)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white"
            >
              <option value="admin">관리자</option>
              <option value="dad">아버지</option>
              <option value="mom">어머니</option>
              <option value="me">본인</option>
              <option value="common">공통</option>
              <option value="unknown">미분류</option>
            </select>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                u.approved
                  ? 'bg-green-50 text-green-600'
                  : 'bg-yellow-50 text-yellow-600'
              }`}
            >
              {u.approved ? '승인됨' : '대기중'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
