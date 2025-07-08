'use client';

import { useState } from 'react';
import { FaImage, FaVideo, FaSmile } from 'react-icons/fa';
import FallbackImage from '@/components/common/FallbackImage';

export default function PostCreation({ onCreatePost }: { onCreatePost?: (post: any) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setText('');
    setImage(null);
    setVideo(null);
    setImagePreview(null);
    setVideoPreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  };

  const handlePost = () => {
    if (!imagePreview && !videoPreview) return;
    const newPost = {
      id: Date.now(),
      user: {
        name: 'Kinnari Tamhane',
        avatar: 'https://ui-avatars.com/api/?name=Kinnari+Tamhane',
      },
      content: text,
      image: imagePreview,
      video: videoPreview,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    if (onCreatePost) onCreatePost(newPost);
    closeModal();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <FallbackImage
          src="https://ui-avatars.com/api/?name=Kinnari+Tamhane"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <button
          className="flex-grow text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={openModal}
        >
          What's on your mind?
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
            <FaVideo className="w-5 h-5 text-red-500" />
            <span className="text-sm">Live Video</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors" onClick={openModal}>
            <FaImage className="w-5 h-5 text-green-500" />
            <span className="text-sm">Photo/Video</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors" onClick={openModal}>
            <FaSmile className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Feeling/Activity</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-4 -right-4 w-12 h-12 mb-3 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none z-10"
              onClick={closeModal}
              aria-label="Close post modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create Post</h2>
            <textarea
              className="w-full h-24 p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="What's on your mind?"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 max-h-40 rounded" />
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Video</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {videoPreview && (
                <video src={videoPreview} controls className="mt-2 max-h-40 rounded w-full" />
              )}
            </div>
            <button
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${image || video ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={handlePost}
              disabled={!image && !video}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}