import { useAuthGuard } from '@/hooks/use-auth-guard';

export function AuthNavigationSync() {
  useAuthGuard();
  return null;
}
