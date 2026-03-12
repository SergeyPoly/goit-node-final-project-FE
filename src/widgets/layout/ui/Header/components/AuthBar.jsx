import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Button } from '@/shared/ui/Button.jsx';
import { useState } from 'react';

export const AuthBar = () => {
  const { setUser } = useUserStore();
  const [isSignInType, setIsSignInType] = useState(true);

  return (
    <div className="flex rounded-[30px] bg-white">
      <Button
        isActive={isSignInType}
        onClick={() => {
          setUser({ name: 'test user', id: 1 })
          setIsSignInType(true)
        }}
      >
        Sign in
      </Button>

      <Button isActive={!isSignInType} onClick={() => setIsSignInType(false)}>
        Sign up
      </Button>
    </div>
  );
};
