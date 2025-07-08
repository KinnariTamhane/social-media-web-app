'use client';

import Feed from '@/components/posts/Feed';
import useSavedFlags from '@/components/posts/useSavedFlags';
import { useState, useEffect } from 'react';

interface User {
  name: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image?: string;
  video?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const posts = [
  {
    id: 1,
    user: {
      name: 'Kinnari Tamhane',
      avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    },
    content: 'Just launched my new project! 🚀',
    image: 'https://picsum.photos/seed/post1/800/600',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 8,
    shares: 3,
  },
  {
    id: 9,
    user: {
      name: 'Kinnari Tamhane',
      avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    },
    content: 'Had a wonderful time hiking in the mountains! 🏔️',
    image: 'https://picsum.photos/seed/post9/800/600',
    timestamp: '1 day ago',
    likes: 30,
    comments: 5,
    shares: 2,
  },
  {
    id: 10,
    user: {
      name: 'Kinnari Tamhane',
      avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    },
    content: 'Enjoyed a delicious brunch with friends! 🥞',
    image: 'https://picsum.photos/seed/post10/800/600',
    timestamp: '3 days ago',
    likes: 25,
    comments: 4,
    shares: 1,
  },
  {
    id: 11,
    user: {
      name: 'Kinnari Tamhane',
      avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    },
    content: 'Started reading a new book. Any recommendations?',
    image: 'https://picsum.photos/seed/post11/800/600',
    timestamp: '5 days ago',
    likes: 18,
    comments: 2,
    shares: 0,
  },
];

export default function MemoriesPage() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [savedFlags, setSavedFlags, loaded] = useSavedFlags();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userPosts');
      if (stored) {
        try {
          setUserPosts(JSON.parse(stored));
        } catch {}
      }
    }
  }, []);
  const handleDelete = (postId: number) => {
    setDeletedIds(prev => [...prev, postId]);
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userPosts');
      if (stored) {
        try {
          const arr = JSON.parse(stored);
          const updated = arr.filter((p: Post) => p.id !== postId);
          localStorage.setItem('userPosts', JSON.stringify(updated));
          setUserPosts(updated);
        } catch {}
      }
    }
  };
  if (!loaded) return null;
  const allPosts = [
    ...userPosts.filter((p: Post) => p.user?.name === 'Kinnari Tamhane'),
    ...posts.filter((p: Post) => p.user?.name === 'Kinnari Tamhane'),
  ].filter((p: Post) => !deletedIds.includes(p.id));
  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Memories</h1>
      <Feed posts={allPosts} savedFlagsProp={savedFlags} setSavedFlagsProp={setSavedFlags} allowDeleteAllByKinnari={true} onDeletePost={handleDelete} />
    </div>
  );
} 