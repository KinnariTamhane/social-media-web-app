'use client';
import FallbackImage from '@/components/common/FallbackImage';
import { useRef } from 'react';

const stories = [
  {
    id: 2,
    name: 'Kinnari Tamhane',
    avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    image: 'https://picsum.photos/seed/story1/200/300',
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    image: 'https://picsum.photos/seed/story2/200/300',
  },
  {
    id: 4,
    name: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    image: 'https://picsum.photos/seed/story3/200/300',
  },
  {
    id: 5,
    name: 'Priya Patel',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel',
    image: 'https://picsum.photos/seed/story4/200/300',
  },
  {
    id: 6,
    name: 'Carlos Gomez',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Gomez',
    image: 'https://picsum.photos/seed/story5/200/300',
  },
  {
    id: 7,
    name: 'Emily Chen',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Chen',
    image: 'https://picsum.photos/seed/story6/200/300',
  },
  {
    id: 8,
    name: 'Alice Smith',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Smith',
    image: 'https://picsum.photos/seed/story7/200/300',
  },
];

export default function WatchPage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Watch</h1>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          &#8592;
        </button>
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative">
              <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                <FallbackImage
                  src={story.image || ''}
                  alt={`${story.name}'s story`}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <FallbackImage
                    src={story.avatar}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="rounded-full border-4 border-blue-500"
                  />
                </div>
              </div>
              <div className="text-center font-semibold text-gray-900 dark:text-white">{story.name}</div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
} 