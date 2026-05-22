'use client';

import { FaThumbsUp, FaComment, FaRegBookmark, FaBookmark, FaTrash, FaPen } from 'react-icons/fa';
import FallbackImage from '@/components/common/FallbackImage';
import {
  type Comment,
  CURRENT_USER,
  ensureCommentsForPosts,
  loadCommentsByPostId,
  saveCommentsByPostId,
} from '@/lib/postComments';
import { useState, useEffect, useMemo } from 'react';

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

export default function Feed({
  showOnlySaved = false,
  savedPostIdsProp,
  setSavedPostIdsProp,
  likeCountsProp,
  posts: postsProp,
  allowDeleteAllByKinnari = false,
  onDeletePost,
}: {
  showOnlySaved?: boolean;
  savedPostIdsProp?: number[];
  setSavedPostIdsProp?: React.Dispatch<React.SetStateAction<number[]>>;
  likeCountsProp?: number[];
  posts?: Post[];
  allowDeleteAllByKinnari?: boolean;
  onDeletePost?: (postId: number) => void;
}) {
  const postsToShow = useMemo(() => postsProp || [], [postsProp]);
  const postIdsKey = postsToShow.map((p) => p.id).join(',');
  const [commentsReady, setCommentsReady] = useState(false);
  const [commentsByPostId, setCommentsByPostId] = useState<Record<number, Comment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [likeCountsByPostId, setLikeCountsByPostId] = useState<Record<number, number>>({});
  const [likedPostIds, setLikedPostIds] = useState<number[]>([]);
  const [localSavedPostIds, setLocalSavedPostIds] = useState<number[]>([]);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<{ postId: number; commentId: string } | null>(null);
  const [editInput, setEditInput] = useState('');
  const [deletedIds] = useState<number[]>([]);

  useEffect(() => {
    const loaded = loadCommentsByPostId(postsToShow);
    setCommentsByPostId(ensureCommentsForPosts(loaded, postsToShow));
    setCommentsReady(true);
  }, [postIdsKey, postsToShow]);

  useEffect(() => {
    if (!commentsReady) return;
    saveCommentsByPostId(commentsByPostId);
  }, [commentsByPostId, commentsReady]);

  useEffect(() => {
    setLikeCountsByPostId((prev) => {
      const next = { ...prev };
      postsToShow.forEach((post, i) => {
        if (!(post.id in next)) {
          next[post.id] = likeCountsProp?.[i] ?? post.likes;
        }
      });
      return next;
    });
  }, [postIdsKey, postsToShow, likeCountsProp]);

  const savedPostIds = savedPostIdsProp ?? localSavedPostIds;
  const isPostSaved = (postId: number) => savedPostIds.includes(postId);
  const isPostLiked = (postId: number) => likedPostIds.includes(postId);

  const handleToggleSave = (postId: number) => {
    const toggle = (prev: number[]) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId];
    if (setSavedPostIdsProp) {
      setSavedPostIdsProp(toggle);
    } else {
      setLocalSavedPostIds(toggle);
    }
  };

  const handleLike = (postId: number) => {
    const liked = isPostLiked(postId);
    setLikeCountsByPostId((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? 0) + (liked ? -1 : 1),
    }));
    setLikedPostIds((prev) =>
      liked ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const filteredPosts = showOnlySaved
    ? postsToShow.filter((post: Post) => isPostSaved(post.id))
    : postsToShow;

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      author: CURRENT_USER,
    };
    setCommentsByPostId((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), newComment],
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleStartEdit = (postId: number, comment: Comment) => {
    setEditingComment({ postId, commentId: comment.id });
    setEditInput(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditInput('');
  };

  const handleSaveEdit = (postId: number, commentId: string) => {
    const text = editInput.trim();
    if (!text) return;
    setCommentsByPostId((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).map((c) =>
        c.id === commentId ? { ...c, text } : c
      ),
    }));
    handleCancelEdit();
  };

  const handleDeleteComment = (postId: number, commentId: string) => {
    setCommentsByPostId((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).filter((c) => c.id !== commentId),
    }));
    if (
      editingComment?.postId === postId &&
      editingComment.commentId === commentId
    ) {
      handleCancelEdit();
    }
  };

  if (!commentsReady) {
    return <div className="text-sm text-gray-400 py-4">Loading posts...</div>;
  }

  return (
    <div className="space-y-4">
      {filteredPosts
        .filter((post: Post) => !deletedIds.includes(post.id))
        .map((post: Post) => {
          const postComments = commentsByPostId[post.id] ?? [];
          const likeCount = likeCountsByPostId[post.id] ?? post.likes;

          return (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <FallbackImage
                  src={post.user.avatar}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  variant="avatar"
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
                    variant="media"
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
                  className={`flex items-center space-x-2 cursor-pointer ${isPostLiked(post.id) ? 'text-white' : ''} rounded px-2 py-1 transition-colors`}
                  onClick={() => handleLike(post.id)}
                >
                  <FaThumbsUp />
                  <span>{likeCount}</span>
                </button>
                <button
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() =>
                    setOpenCommentsPostId(
                      openCommentsPostId === post.id ? null : post.id
                    )
                  }
                >
                  <FaComment className="group-hover:text-white rounded transition-colors duration-150" />
                  <span>{postComments.length}</span>
                  <span>comments</span>
                </button>
                <button
                  className={`flex items-center hover:text-gray-500 cursor-pointer ${isPostSaved(post.id) ? 'text-gray-500' : ''}`}
                  onClick={() => handleToggleSave(post.id)}
                >
                  {isPostSaved(post.id) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                {allowDeleteAllByKinnari && post.user?.name === CURRENT_USER && (
                  <button
                    className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => onDeletePost && onDeletePost(post.id)}
                    title="Delete post"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              {openCommentsPostId === post.id && (
                <div className="mb-2">
                  {postComments.length > 0 ? (
                    <ul className="space-y-1">
                      {postComments.map((comment) => {
                        const isEditing =
                          editingComment?.postId === post.id &&
                          editingComment.commentId === comment.id;
                        return (
                          <li
                            key={comment.id}
                            className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                          >
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400"
                                  value={editInput}
                                  onChange={(e) => setEditInput(e.target.value)}
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                                  onClick={() => handleSaveEdit(post.id, comment.id)}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                              <span className="flex-1">{comment.text}</span>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  className="text-gray-500 hover:text-blue-600 cursor-pointer p-1"
                                  onClick={() => handleStartEdit(post.id, comment)}
                                  title="Edit comment"
                                >
                                  <FaPen />
                                </button>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-800 cursor-pointer p-1"
                                  onClick={() => handleDeleteComment(post.id, comment.id)}
                                  title="Delete comment"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="text-xs text-gray-400">No comments yet.</div>
                  )}
                  <form
                    className="flex mt-2 space-x-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddComment(post.id);
                    }}
                  >
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
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
      {showOnlySaved && filteredPosts.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No saved posts yet. Bookmark a post from the feed to see it here.
        </p>
      )}
    </div>
  );
}
