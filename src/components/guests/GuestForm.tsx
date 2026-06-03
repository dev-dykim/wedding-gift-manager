import { useState, useEffect } from 'react';
import type { Guest, Category, Relation } from '../../types';

interface GuestFormProps {
  onSubmit: (guest: Omit<Guest, 'id' | 'created_at' | 'created_by'>) => void;
  onCancel: () => void;
  initial?: Guest | null;
}

export default function GuestForm({ onSubmit, onCancel, initial }: GuestFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [amount, setAmount] = useState(initial?.amount?.toString() ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'dad');
  const [relation, setRelation] = useState<Relation>(initial?.relation ?? '친척');
  const [memo, setMemo] = useState(initial?.memo ?? '');
  const [thanked, setThanked] = useState(initial?.thanked ?? false);

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setAmount(initial.amount.toString());
      setCategory(initial.category);
      setRelation(initial.relation);
      setMemo(initial.memo ?? '');
      setThanked(initial.thanked);
    }
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      amount: Number(amount),
      category,
      relation,
      memo: memo.trim() || null,
      thanked,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full rounded-t-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-lg font-bold text-gray-900">
          {initial ? '축의금 수정' : '축의금 추가'}
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">금액 (원)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={0}
            step={10000}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="dad">아버지</option>
              <option value="mom">어머니</option>
              <option value="me">본인</option>
              <option value="common">공통</option>
              <option value="unknown">미분류</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">관계</label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value as Relation)}
              className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="친척">친척</option>
              <option value="직장">직장</option>
              <option value="친구">친구</option>
              <option value="교회">교회</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="선택사항"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={thanked}
            onChange={(e) => setThanked(e.target.checked)}
            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          답례 완료
        </label>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-2.5 text-sm font-medium"
          >
            {initial ? '수정' : '추가'}
          </button>
        </div>
      </form>
    </div>
  );
}
