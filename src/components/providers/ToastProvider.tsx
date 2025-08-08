'use client';

import { ToastSystem } from '@cubig/design-system';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return <ToastSystem maxToasts={3}>{children}</ToastSystem>;
}
