import type { Post } from '@/data/defaultPosts';

export interface Comment {
  id: string;
  text: string;
  author: string;
}

export const CURRENT_USER = 'Kinnari Tamhane';
const COMMENTS_BY_ID_KEY = 'postCommentsById';
const LEGACY_COMMENTS_KEY = 'postComments';

export function defaultCommentsForPost(post: Post): Comment[] {
  return Array.from({ length: post.comments }, (_, i) => ({
    id: `mock-${post.id}-${i}`,
    text: `Comment ${i + 1} for post #${post.id}`,
    author: 'Other',
  }));
}

function normalizeComment(item: unknown): Comment {
  if (typeof item === 'string') {
    const isOwn = item.trim().toLowerCase().startsWith('kinnari');
    return {
      id: `${Date.now()}-${Math.random()}`,
      text: item,
      author: isOwn ? CURRENT_USER : 'Other',
    };
  }
  if (item && typeof item === 'object' && 'text' in item) {
    const c = item as Partial<Comment>;
    return {
      id: c.id || `${Date.now()}-${Math.random()}`,
      text: String(c.text ?? ''),
      author: c.author || 'Other',
    };
  }
  return { id: `${Date.now()}-${Math.random()}`, text: '', author: 'Other' };
}

function parseLegacyIndexComments(stored: string, posts: Post[]): Record<number, Comment[]> {
  try {
    const parsed = JSON.parse(stored) as unknown[];
    if (!Array.isArray(parsed)) return {};
    const byId: Record<number, Comment[]> = {};
    posts.forEach((post, i) => {
      const entry = parsed[i];
      if (!Array.isArray(entry)) return;
      byId[post.id] = entry.map(normalizeComment);
    });
    return byId;
  } catch {
    return {};
  }
}

export function loadCommentsByPostId(posts: Post[]): Record<number, Comment[]> {
  if (typeof window === 'undefined') return {};

  const storedById = localStorage.getItem(COMMENTS_BY_ID_KEY);
  if (storedById) {
    try {
      const parsed = JSON.parse(storedById) as Record<string, unknown>;
      const byId: Record<number, Comment[]> = {};
      for (const [key, value] of Object.entries(parsed)) {
        const postId = Number(key);
        if (!Number.isFinite(postId) || !Array.isArray(value)) continue;
        byId[postId] = value.map(normalizeComment);
      }
      return byId;
    } catch {
      /* fall through to legacy */
    }
  }

  const legacy = localStorage.getItem(LEGACY_COMMENTS_KEY);
  if (legacy) return parseLegacyIndexComments(legacy, posts);

  const byId: Record<number, Comment[]> = {};
  posts.forEach((post) => {
    byId[post.id] = defaultCommentsForPost(post);
  });
  return byId;
}

export function saveCommentsByPostId(byId: Record<number, Comment[]>): void {
  if (typeof window === 'undefined') return;
  const serializable: Record<string, Comment[]> = {};
  for (const [id, comments] of Object.entries(byId)) {
    serializable[id] = comments;
  }
  localStorage.setItem(COMMENTS_BY_ID_KEY, JSON.stringify(serializable));
}

export function ensureCommentsForPosts(
  byId: Record<number, Comment[]>,
  posts: Post[]
): Record<number, Comment[]> {
  const next = { ...byId };
  posts.forEach((post) => {
    if (!next[post.id]) {
      next[post.id] = defaultCommentsForPost(post);
    }
  });
  return next;
}
