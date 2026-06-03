import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Guest, GuestFilter, User, Category } from '../types';

function getAllowedCategories(user: User): Category[] {
  switch (user.role) {
    case 'admin':
      return ['dad', 'mom', 'me', 'unknown'];
    case 'dad':
    case 'mom':
      return ['dad', 'mom'];
    case 'me':
      return ['me'];
  }
}

export function useGuests(user: User | null) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GuestFilter>({
    search: '',
    category: 'all',
    relation: 'all',
    amountRange: 'all',
  });

  const fetchGuests = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const allowed = getAllowedCategories(user);
    let query = supabase
      .from('guests')
      .select('*')
      .in('category', allowed)
      .order('created_at', { ascending: false });

    if (filter.category !== 'all') {
      query = query.eq('category', filter.category);
    }
    if (filter.relation !== 'all') {
      query = query.eq('relation', filter.relation);
    }
    if (filter.search) {
      query = query.ilike('name', `%${filter.search}%`);
    }
    if (filter.amountRange === 'under5') {
      query = query.lte('amount', 50000);
    } else if (filter.amountRange === '5to10') {
      query = query.gte('amount', 50000).lte('amount', 100000);
    } else if (filter.amountRange === 'over10') {
      query = query.gt('amount', 100000);
    }

    const { data, error } = await query;
    if (!error && data) {
      setGuests(data as Guest[]);
    }
    setLoading(false);
  }, [user, filter]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  async function addGuest(guest: Omit<Guest, 'id' | 'created_at' | 'created_by'>) {
    if (!user) return { error: new Error('Not authenticated') };
    const { error } = await supabase.from('guests').insert({
      ...guest,
      created_by: user.id,
    });
    if (!error) await fetchGuests();
    return { error };
  }

  async function updateGuest(id: string, updates: Partial<Guest>) {
    const { error } = await supabase.from('guests').update(updates).eq('id', id);
    if (!error) {
      setGuests((prev) => prev.map((g) => g.id === id ? { ...g, ...updates } : g));
    }
    return { error };
  }

  async function deleteGuest(id: string) {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (!error) {
      setGuests((prev) => prev.filter((g) => g.id !== id));
    }
    return { error };
  }

  async function toggleThanked(id: string, thanked: boolean) {
    return updateGuest(id, { thanked });
  }

  return {
    guests,
    loading,
    filter,
    setFilter,
    addGuest,
    updateGuest,
    deleteGuest,
    toggleThanked,
    refetch: fetchGuests,
  };
}
