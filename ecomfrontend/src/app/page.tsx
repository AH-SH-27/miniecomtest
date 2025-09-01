'use client'

import { useAppSelector } from '@/lib/hooks';
import { selectAuth } from '@/lib/features/auth/authSlice';

export default function Home() {
  const { user, token } = useAppSelector(selectAuth);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <header className="row-start-1">
        {token && user ? (
          <div className="text-green-600">
            Logged in as: {user.fullName } , email: { user.email } , role: ({user.role})
          </div>
        ) : (
          <div className="text-red-600">Not logged in</div>
        )}
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>MAIN</div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div>FOOTER</div> 
      </footer>
    </div>
  );
}
