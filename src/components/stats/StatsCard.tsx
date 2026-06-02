import type { CategoryStats } from '../../types';

interface StatsCardProps {
  stats: CategoryStats;
}

const categoryLabel: Record<string, string> = {
  dad: '아버지',
  mom: '어머니',
  sibling: '형제/자매',
};

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">
        {categoryLabel[stats.category]}
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-400">총액</p>
          <p className="text-lg font-bold text-sky-600">
            {stats.totalAmount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">인원</p>
          <p className="text-lg font-bold text-gray-900">{stats.count}명</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">평균</p>
          <p className="text-lg font-bold text-gray-900">
            {stats.average.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
