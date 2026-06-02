import UserManagement from '../components/admin/UserManagement';

export default function AdminPage() {
  return (
    <div className="p-4 pb-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">회원 관리</h2>
      <UserManagement />
    </div>
  );
}
