import { useEffect, useState } from 'react';
import { DEFAULT_POST_IDS } from '@/data/defaultPosts';

const SAVED_POST_IDS_KEY = 'savedPostIds';
const LEGACY_SAVED_FLAGS_KEY = 'savedFlags';

function migrateLegacySavedFlags(): number[] {
  const legacy = localStorage.getItem(LEGACY_SAVED_FLAGS_KEY);
  if (!legacy) return [];
  try {
    const flags = JSON.parse(legacy) as boolean[];
    if (!Array.isArray(flags)) return [];
    return DEFAULT_POST_IDS.filter((_, i) => flags[i]);
  } catch {
    return [];
  }
}

export default function useSavedFlags() {
  const [savedPostIds, setSavedPostIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_POST_IDS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'number')) {
          setSavedPostIds(parsed);
          setLoaded(true);
          return;
        }
      } catch {}
    }
    setSavedPostIds(migrateLegacySavedFlags());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(SAVED_POST_IDS_KEY, JSON.stringify(savedPostIds));
    }
  }, [savedPostIds, loaded]);

  return [savedPostIds, setSavedPostIds, loaded] as const;
}
