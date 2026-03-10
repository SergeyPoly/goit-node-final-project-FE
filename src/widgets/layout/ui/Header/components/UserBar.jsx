import { Link } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/use-user-store.js';

export const UserBar = ({ user }) => {
  const { logout } = useUserStore();

  return (
    <div className="flex items-center gap-3">
      <Link to={`/user/${user?.id}`} className="font-medium underline decoration-orange-500">
        {user?.name || 'My Profile'}
      </Link>
      <div className="h-8 w-8 rounded-full bg-gray-200" />
      <button className="rounded-md border px-4 py-2 text-sm font-medium" onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
};
