import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Button } from '@/shared/ui/Button.jsx'
import { useState } from 'react';

export const AuthBar = () => {
  const { setUser } = useUserStore();
  const [active, setActive] = useState("signin");

  return (
    <div className="flex bg-[var(--color-white)] rounded-[30px] ">
      <Button isActive={active === "signin"}
        onClick={() => { setUser({ name: 'test user', id: 1 }), setActive("signin") }}>
        Sign in
      </Button>

      <Button isActive={active === "signup"}
        onClick={() => setActive("signup")}>Sign up</Button>

    </div>
  );
};