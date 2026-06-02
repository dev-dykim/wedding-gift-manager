import { useState } from 'react';
import type { Guest, User } from '../types';
import FilterBar from '../components/guests/FilterBar';
import GuestList from '../components/guests/GuestList';
import GuestForm from '../components/guests/GuestForm';
import { useGuests } from '../hooks/useGuests';

interface GuestListPageProps {
  user: User;
}

export default function GuestListPage({ user }: GuestListPageProps) {
  const { guests, loading, filter, setFilter, addGuest, updateGuest, deleteGuest, toggleThanked } = useGuests(user);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  const isAdmin = user.role === 'admin';

  async function handleSubmit(data: Omit<Guest, 'id' | 'created_at' | 'created_by'>) {
    if (editingGuest) {
      await updateGuest(editingGuest.id, data);
    } else {
      await addGuest(data);
    }
    setShowForm(false);
    setEditingGuest(null);
  }

  function handleEdit(guest: Guest) {
    setEditingGuest(guest);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteGuest(id);
    }
  }

  return (
    <div className="pb-20">
      <FilterBar filter={filter} onChange={setFilter} user={user} />
      <GuestList
        guests={guests}
        user={user}
        loading={loading}
        onToggleThanked={toggleThanked}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isAdmin && (
        <button
          onClick={() => { setEditingGuest(null); setShowForm(true); }}
          className="fixed bottom-20 right-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full w-14 h-14 text-2xl shadow-lg z-10"
        >
          +
        </button>
      )}
      {showForm && (
        <GuestForm
          initial={editingGuest}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingGuest(null); }}
        />
      )}
    </div>
  );
}
