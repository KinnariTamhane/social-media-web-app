'use client';

import Stories from '@/components/stories/Stories';
import PostCreation from '@/components/posts/PostCreation';
import Feed from '@/components/posts/Feed';
import useSavedFlags from '@/components/posts/useSavedFlags';
import { defaultPosts, type Post } from '@/data/defaultPosts';
import { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const [savedPostIds, setSavedPostIds, loaded] = useSavedFlags();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsReady, setPostsReady] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('userPosts');
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch {}
    }
    setPostsReady(true);
  }, []);
  const allPosts = useMemo(() => [...posts, ...defaultPosts], [posts]);
  const handleCreatePost = (post: Post) => {
    setPosts(prev => {
      const updated = [post, ...prev];
      localStorage.setItem('userPosts', JSON.stringify(updated));
      return updated;
    });
  };
  if (!loaded || !postsReady) return null;
  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full">
      <Stories />
      <PostCreation onCreatePost={handleCreatePost} />
      <Feed savedPostIdsProp={savedPostIds} setSavedPostIdsProp={setSavedPostIds} posts={allPosts} />
    </div>
  );
}
