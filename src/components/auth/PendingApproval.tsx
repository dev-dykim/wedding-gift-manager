interface PendingApprovalProps {
  onSignOut: () => void;
}

export default function PendingApproval({ onSignOut }: PendingApprovalProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="text-lg font-bold mb-2">승인 대기 중</h2>
        <p className="text-gray-500 text-sm mb-6">
          관리자가 회원가입을 승인하면
          <br />
          서비스를 이용할 수 있습니다.
        </p>
        <button
          onClick={onSignOut}
          className="text-sm text-gray-400 hover:text-gray-600 underline"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
