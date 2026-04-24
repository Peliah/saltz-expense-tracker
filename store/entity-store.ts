type EntityKey = 'transactions' | 'categories' | 'allocations' | 'security';

const listeners = new Set<() => void>();
const versions: Record<EntityKey, number> = {
  transactions: 0,
  categories: 0,
  allocations: 0,
  security: 0,
};

export function subscribeEntityStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function bumpEntityVersion(key: EntityKey): void {
  versions[key] += 1;
  listeners.forEach((listener) => listener());
}

export function getEntityVersion(key: EntityKey): number {
  return versions[key];
}
