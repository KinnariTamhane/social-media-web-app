'use client';

import Link from 'next/link';
import FallbackImage from '@/components/common/FallbackImage';

interface NavbarProps {
  onAvatarClick?: () => void;
}

export default function Navbar({ onAvatarClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Connect People</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 sm:hidden"
                  onClick={onAvatarClick}
                  aria-label="Open menu"
                >
                  <FallbackImage
                    className="w-8 h-8 rounded-full"
                    src="https://ui-avatars.com/api/?name=Kinnari+Tamhane"
                    alt="user photo"
                    width={32}
                    height={32}
                  />
                </button>
              </div>
              <div className="hidden sm:flex items-center space-x-2 ml-4">
                <span className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-base">KT</span>
                <span className="font-semibold text-gray-900 dark:text-white">Kinnari Tamhane</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}