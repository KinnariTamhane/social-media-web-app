'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUserFriends, FaStore, FaVideo, FaHistory, FaBookmark, FaCalendarAlt } from 'react-icons/fa';

export const menuItems = [
  { icon: FaUserFriends, label: 'Friends', href: '/friends' },
  // { icon: FaStore, label: 'Marketplace', href: '/marketplace' },
  { icon: FaVideo, label: 'Watch', href: '/watch' },
  { icon: FaHistory, label: 'Memories', href: '/memories' },
  { icon: FaBookmark, label: 'Saved', href: '/saved' },
  { icon: FaCalendarAlt, label: 'Events', href: '/events' },
];

interface SidebarProps {
  onFriendsClick?: () => void;
}

export default function Sidebar({ onFriendsClick }: SidebarProps) {
  return (
    <aside className="fixed top-[3.75rem] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 hidden sm:block" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.label === 'Friends' ? (
                <button
                  onClick={onFriendsClick}
                  className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}