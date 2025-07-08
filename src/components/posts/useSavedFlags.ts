import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'savedFlags';
const NUM_POSTS = 7; // Update if the number of posts changes

export default function useSavedFlags() {
  // Always initialize to a fixed value for SSR consistency
  const [savedFlags, setSavedFlags] = useState<boolean[]>(Array(NUM_POSTS).fill(false));
  const [loaded, setLoaded] = useState(false);

  // Only read from localStorage on the client
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === NUM_POSTS) {
          setSavedFlags(parsed);
        }
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedFlags));
    }
  }, [savedFlags, loaded]);

  return [savedFlags, setSavedFlags, loaded] as const;
} 