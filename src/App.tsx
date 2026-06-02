import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import PendingApproval from './components/auth/PendingApproval';
import LoginPage from './pages/LoginPage';
import GuestListPage from './pages/GuestListPage';
import StatsPage from './pages/StatsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSignIn={signIn} onSignUp={signUp} />;
  }

  if (!user.approved) {
    return <PendingApproval onSignOut={signOut} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onSignOut={signOut} />
        <main>
          <Routes>
            <Route path="/" element={<GuestListPage user={user} />} />
            <Route path="/stats" element={<StatsPage user={user} />} />
            {user.role === 'admin' && (
              <Route path="/admin" element={<AdminPage />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav user={user} />
      </div>
    </BrowserRouter>
  );
}
