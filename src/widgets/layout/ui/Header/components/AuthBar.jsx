import { useUserStore } from '@/entities/user/model/use-user-store.js';

export const AuthBar = () => {
  const { setUser } = useUserStore();

  return (
    <div className="flex gap-3">
      <button
        className="rounded-md border px-4 py-2 text-sm font-medium"
        onClick={() => setUser({ name: 'test user', id: 1 })}
      >
        Sign In
      </button>
      <button className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white">
        Sign Up
      </button>
    </div>
  );
};
