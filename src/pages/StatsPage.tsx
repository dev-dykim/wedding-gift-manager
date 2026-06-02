import { useMemo } from 'react';
import type { User, Category, CategoryStats } from '../types';
import { useGuests } from '../hooks/useGuests';
import StatsCard from '../components/stats/StatsCard';

interface StatsPageProps {
  user: User;
}

export default function StatsPage({ user }: StatsPageProps) {
  const { guests, loading } = useGuests(user);

  const stats = useMemo(() => {
    const categories: Category[] = ['dad', 'mom', 'sibling'];
    return categories
      .map((category): CategoryStats => {
        const filtered = guests.filter((g) => g.category === category);
        const totalAmount = filtered.reduce((sum, g) => sum + g.amount, 0);
        return {
          category,
          totalAmount,
          count: filtered.length,
          average: filtered.length > 0 ? Math.round(totalAmount / filtered.length) : 0,
        };
      })
      .filter((s) => s.count > 0);
  }, [guests]);

  const grandTotal = guests.reduce((sum, g) => sum + g.amount, 0);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="bg-sky-500 rounded-xl p-5 text-white text-center">
        <p className="text-sm opacity-80">전체 축의금 총액</p>
        <p className="text-3xl font-bold mt-1">{grandTotal.toLocaleString()}원</p>
        <p className="text-sm opacity-80 mt-1">총 {guests.length}명</p>
      </div>
      {stats.map((s) => (
        <StatsCard key={s.category} stats={s} />
      ))}
      {stats.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          등록된 축의금이 없습니다.
        </div>
      )}
    </div>
  );
}
