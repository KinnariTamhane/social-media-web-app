'use client';
import Feed from '@/components/posts/Feed';
import useSavedFlags from '@/components/posts/useSavedFlags';
import { defaultPosts, type Post } from '@/data/defaultPosts';
import { useState, useEffect, useMemo } from 'react';

export default function SavedPage() {
  const [savedPostIds, setSavedPostIds, loaded] = useSavedFlags();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsReady, setPostsReady] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('userPosts');
    if (stored) {
      try {
        setUserPosts(JSON.parse(stored));
      } catch {}
    }
    setPostsReady(true);
  }, []);
  const allPosts = useMemo(() => [...userPosts, ...defaultPosts], [userPosts]);
  if (!loaded || !postsReady) return null;
  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Saved Posts</h1>
      <Feed
        showOnlySaved={true}
        savedPostIdsProp={savedPostIds}
        setSavedPostIdsProp={setSavedPostIds}
        posts={allPosts}
      />
    </div>
  );
}
