'use client';

import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import TanStackProvider from './TanStackProvider';
import { Toaster } from '@/components/ui/sonner';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <TanStackProvider>
        {children}
        <Toaster richColors position="top-right" />
      </TanStackProvider>
    </StoreProvider>
  );
}
