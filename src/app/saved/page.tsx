'use client';
import Feed from '@/components/posts/Feed';
import useSavedFlags from '@/components/posts/useSavedFlags';
import { useState, useEffect } from 'react';

export default function SavedPage() {
  const [savedFlags, setSavedFlags, loaded] = useSavedFlags();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('userPosts');
    if (stored) {
      try {
        setUserPosts(JSON.parse(stored));
      } catch {}
    }
  }, []);
  if (!loaded) return null;
  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Saved Posts</h1>
      <Feed showOnlySaved={true} savedFlagsProp={savedFlags} setSavedFlagsProp={setSavedFlags} posts={userPosts} />
    </div>
  );
}