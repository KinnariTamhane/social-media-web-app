export interface User {
  name: string;
  avatar: string;
}

export interface Post {
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

export const DEFAULT_POST_IDS = [1, 2, 3, 4, 5, 6, 7] as const;

export const defaultPosts: Post[] = [
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
    id: 2,
    user: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    content: 'Beautiful sunset today! 🌅',
    image: 'https://picsum.photos/seed/post2/800/600',
    timestamp: '5 hours ago',
    likes: 28,
    comments: 5,
    shares: 1,
  },
  {
    id: 3,
    user: {
      name: 'Alice Smith',
      avatar: 'https://ui-avatars.com/api/?name=Alice+Smith',
    },
    content: 'Had an amazing brunch with friends! 🥞',
    image: 'https://picsum.photos/seed/post3/800/600',
    timestamp: '1 day ago',
    likes: 55,
    comments: 12,
    shares: 4,
  },
  {
    id: 4,
    user: {
      name: 'Bob Lee',
      avatar: 'https://ui-avatars.com/api/?name=Bob+Lee',
    },
    content: 'Started reading a new book. Any recommendations?',
    image: 'https://picsum.photos/seed/post4/800/600',
    timestamp: '2 days ago',
    likes: 33,
    comments: 7,
    shares: 2,
  },
  {
    id: 5,
    user: {
      name: 'Priya Patel',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Patel',
    },
    content: 'Exploring the mountains this weekend! 🏔️',
    image: 'https://picsum.photos/seed/post5/800/600',
    timestamp: '3 days ago',
    likes: 61,
    comments: 15,
    shares: 5,
  },
  {
    id: 6,
    user: {
      name: 'Carlos Gomez',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Gomez',
    },
    content: 'Cooked a delicious meal today! 🍲',
    image: 'https://picsum.photos/seed/post6/800/600',
    timestamp: '4 days ago',
    likes: 47,
    comments: 9,
    shares: 3,
  },
  {
    id: 7,
    user: {
      name: 'Emily Chen',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Chen',
    },
    content: 'Attended a fantastic concert last night! 🎶',
    image: 'https://picsum.photos/seed/post7/800/600',
    timestamp: '5 days ago',
    likes: 39,
    comments: 6,
    shares: 2,
  },
];
