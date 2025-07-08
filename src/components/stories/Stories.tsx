'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import FallbackImage from '@/components/common/FallbackImage';

type Story = {
  id: number;
  name: string;
  avatar: string;
  image: string | null;
  isYourStory?: boolean;
};

const stories = [
  {
    id: 1,
    name: 'Your Story',
    avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
    image: null,
    isYourStory: true,
  },
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

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <div className="flex space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 relative group cursor-pointer w-[110px] min-w-[110px]"
            onClick={() => !story.isYourStory && setSelectedStory(story)}
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              {story.isYourStory ? (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <div className="p-1 rounded-full bg-blue-500">
                    <FaPlus className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <FallbackImage
                  src={story.image || ''}
                  alt={`${story.name}'s story`}
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute top-2 left-2">
              <div className="relative">
                <FallbackImage
                  src={story.avatar}
                  alt={story.name}
                  width={40}
                  height={40}
                  className="rounded-full border-4 border-blue-500"
                />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-sm text-white truncate shadow-text">{story.name}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-xs w-full relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-4 -right-4 w-12 h-12 mb-3 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none z-10"
              onClick={() => setSelectedStory(null)}
              aria-label="Close story modal"
            >
              &times;
            </button>
            <FallbackImage
              src={selectedStory.image || ''}
              alt={selectedStory.name}
              width={300}
              height={400}
              className="w-full h-80 object-cover rounded-lg mb-4 border border-gray-100 dark:border-gray-800"
            />
            <div className="flex items-center space-x-3 mt-2">
              <FallbackImage
                src={selectedStory.avatar || ''}
                alt={selectedStory.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-blue-500 shadow"
              />
              <span className="font-semibold text-lg text-gray-900 dark:text-white drop-shadow">{selectedStory.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}