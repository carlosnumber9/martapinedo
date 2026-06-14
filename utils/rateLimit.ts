import 'server-only';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __contactFormRateLimitStore?: Map<string, RateLimitEntry>;
};

const getRateLimitStore = () => {
  globalRateLimitStore.__contactFormRateLimitStore ??= new Map<string, RateLimitEntry>();

  return globalRateLimitStore.__contactFormRateLimitStore;
};

export const assertRateLimit = ({ key, limit, windowMs }: RateLimitOptions) => {
  const store = getRateLimitStore();
  const now = Date.now();
  const currentEntry = store.get(key);

  if (!currentEntry || currentEntry.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return;
  }

  if (currentEntry.count >= limit) {
    throw new Error('Rate limit exceeded');
  }

  currentEntry.count += 1;
};
