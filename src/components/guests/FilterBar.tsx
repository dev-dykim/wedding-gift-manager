import { useState, useEffect, useRef } from 'react';
import type { GuestFilter, User } from '../../types';

interface FilterBarProps {
  filter: GuestFilter;
  onChange: (filter: GuestFilter) => void;
  user: User;
}

export default function FilterBar({ filter, onChange, user }: FilterBarProps) {
  const showAllCategories = user.role === 'admin';
  const showDadMom = ['admin', 'dad', 'mom'].includes(user.role);
  const [localSearch, setLocalSearch] = useState(filter.search);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (localSearch !== filter.search) {
        onChange({ ...filter, search: localSearch });
      }
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [localSearch]);

  return (
    <div className="space-y-3 p-4 bg-white border-b border-gray-100">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="이름 검색..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="flex gap-2 flex-wrap">
        <select
          value={filter.category}
          onChange={(e) => onChange({ ...filter, category: e.target.value as GuestFilter['category'] })}
          className="h-[42px] border border-gray-200 rounded-lg px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">전체 카테고리</option>
          {showDadMom && <option value="dad">아버지</option>}
          {showDadMom && <option value="mom">어머니</option>}
          {(showAllCategories || user.role === 'me') && (
            <option value="me">본인</option>
          )}
          <option value="common">공통</option>
          <option value="unknown">미분류</option>
        </select>
        <select
          value={filter.relation}
          onChange={(e) => onChange({ ...filter, relation: e.target.value as GuestFilter['relation'] })}
          className="h-[42px] border border-gray-200 rounded-lg px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">전체 관계</option>
          <option value="친척">친척</option>
          <option value="직장">직장</option>
          <option value="친구">친구</option>
          <option value="교회">교회</option>
          <option value="기타">기타</option>
        </select>
        <select
          value={filter.amountRange}
          onChange={(e) => onChange({ ...filter, amountRange: e.target.value as GuestFilter['amountRange'] })}
          className="h-[42px] border border-gray-200 rounded-lg px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">전체 금액</option>
          <option value="under5">5만원 이하</option>
          <option value="5to10">5~10만원</option>
          <option value="over10">10만원 초과</option>
        </select>
      </div>
    </div>
  );
}
