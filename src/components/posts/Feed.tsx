'use client';

import { FaThumbsUp, FaComment, FaRegBookmark, FaBookmark, FaTrash } from 'react-icons/fa';
import FallbackImage from '@/components/common/FallbackImage';
import { useState, useEffect } from 'react';

export default function Feed({ showOnlySaved = false, savedFlagsProp, setSavedFlagsProp, likeCountsProp, posts: postsProp, allowDeleteAllByKinnari = false, onDeletePost }: {
  showOnlySaved?: boolean,
  savedFlagsProp?: boolean[],
  setSavedFlagsProp?: React.Dispatch<React.SetStateAction<boolean[]>>,
  likeCountsProp?: number[],
  posts?: any[],
  allowDeleteAllByKinnari?: boolean,
  onDeletePost?: (postId: number) => void,
}) {
  const postsToShow = postsProp || [];
  const [likeCounts, setLikeCounts] = useState<number[]>(likeCountsProp || postsToShow.map((post: any) => post.likes));
  const [likedFlags, setLikedFlags] = useState<boolean[]>(postsToShow.map(() => false));
  const [savedFlags, setSavedFlags] = useState<boolean[]>(savedFlagsProp || postsToShow.map(() => false));
  const [openCommentsIdx, setOpenCommentsIdx] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<string[]>(postsToShow.map(() => ''));
  const [commentsState, setCommentsState] = useState<string[][]>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem('postComments');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    // Default: mock comments for each post
    return postsToShow.map((post: any) => Array.from({ length: post.comments }, (_, i) => `Comment ${i + 1} for post #${post.id}`));
  });
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem('postComments', JSON.stringify(commentsState));
  }, [commentsState]);

  // Use prop setter if provided, otherwise local state
  const handleToggleSave = (index: number) => {
    if (setSavedFlagsProp) {
      setSavedFlagsProp((prev: boolean[]) => prev.map((flag: boolean, i: number) => i === index ? !flag : flag));
    } else {
      setSavedFlags((prev: boolean[]) => prev.map((flag: boolean, i: number) => i === index ? !flag : flag));
    }
  };
  // Use prop state if provided
  const flags = savedFlagsProp || savedFlags;
  const handleLike = (index: number) => {
    setLikeCounts((prev: number[]) => prev.map((count: number, i: number) => {
      if (i === index) {
        return likedFlags[i] ? count - 1 : count + 1;
      }
      return count;
    }));
    setLikedFlags((prev: boolean[]) => prev.map((flag: boolean, i: number) => i === index ? !flag : flag));
  };
  const filteredPosts = showOnlySaved ? postsToShow.filter((_: any, idx: number) => flags[idx]) : postsToShow;

  const handleAddComment = (postIdx: number) => {
    if (!commentInputs[postIdx].trim()) return;
    setCommentsState(prev => {
      const updated = prev.map((arr, i) => i === postIdx ? [...arr, commentInputs[postIdx]] : arr);
      return updated;
    });
    setCommentInputs(prev => prev.map((val, i) => i === postIdx ? '' : val));
  };

  const handleDelete = (postId: number) => {
    setDeletedIds(prev => [...prev, postId]);
    // Remove from localStorage if user-created
    const stored = localStorage.getItem('userPosts');
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        const updated = arr.filter((p: any) => p.id !== postId);
        localStorage.setItem('userPosts', JSON.stringify(updated));
      } catch {}
    }
  };

  const handleDeleteComment = (postIdx: number, commentIdx: number) => {
    setCommentsState(prev => {
      const updated = prev.map((arr, i) =>
        i === postIdx ? arr.filter((_, j) => j !== commentIdx) : arr
      );
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      {filteredPosts.filter((post: any) => !deletedIds.includes(post.id)).map((post: any, idx: number) => {
        const realIdx = showOnlySaved ? postsToShow.findIndex((p: any) => p.id === post.id) : idx;
        // Mock comments array for demo
        const commentsArray = Array.from({ length: post.comments }, (_, i) => `Comment ${i + 1} for post #${post.id}`);
        return (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <FallbackImage
                src={post.user.avatar}
                alt={post.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold text-gray-900 dark:text-white">{post.user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
              </div>
            </div>

            <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

            {post.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <FallbackImage
                  src={post.image}
                  alt="Post image"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            )}
            {post.video && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <video src={post.video} controls className="w-full h-auto rounded" />
              </div>
            )}

            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
              <button
                className={`flex items-center space-x-2 cursor-pointer ${likedFlags[idx] ? 'text-white' : ''} rounded px-2 py-1 transition-colors`}
                onClick={() => handleLike(idx)}
              >
                <FaThumbsUp />
                <span>{likeCounts[idx]}</span>
              </button>
              <button
                className="flex items-center space-x-2 cursor-pointer group"
                onClick={() => setOpenCommentsIdx(openCommentsIdx === idx ? null : idx)}
              >
                <FaComment className="group-hover:text-white rounded transition-colors duration-150" />
                <span>{post.comments}</span>
                <span>comments</span>
              </button>
              <button
                className={`flex items-center hover:text-gray-500 cursor-pointer ${flags[realIdx] ? 'text-gray-500' : ''}`}
                onClick={() => handleToggleSave(realIdx)}
              >
                {flags[realIdx] ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              {allowDeleteAllByKinnari && post.user?.name === 'Kinnari Tamhane' && (
                <button
                  className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => onDeletePost && onDeletePost(post.id)}
                  title="Delete post"
                >
                  <FaTrash />
                </button>
              )}
            </div>

            {/* Show all comments below the icons section only if open */}
            {openCommentsIdx === idx && (
              <div className="mb-2">
                {commentsState[idx] && commentsState[idx].length > 0 ? (
                  <ul className="space-y-1">
                    {commentsState[idx].map((comment, i) => (
                      <li key={i} className="flex items-center text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                        <span className="flex-1">{comment}</span>
                        {comment.trim().toLowerCase().startsWith('kinnari') && (
                          <button
                            className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => handleDeleteComment(idx, i)}
                            title="Delete comment"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-gray-400">No comments yet.</div>
                )}
                <form className="flex mt-2 space-x-2" onSubmit={e => { e.preventDefault(); handleAddComment(idx); }}>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400"
                    placeholder="Add a comment..."
                    value={commentInputs[idx] || ''}
                    onChange={e => setCommentInputs(prev => prev.map((val, i) => i === idx ? e.target.value : val))}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded "
                  >
                    Post
                  </button>
                </form>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}