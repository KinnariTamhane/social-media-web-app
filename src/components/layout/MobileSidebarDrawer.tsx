'use client';

import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import FallbackImage from '@/components/common/FallbackImage';
import contacts from '@/data/contacts';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

interface MobileSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  onFriendsClick: () => void;
  menuItems: MenuItem[];
}

const onlineContacts = contacts.filter((c) => c.status === 'online');

export default function MobileSidebarDrawer({ open, onClose, onFriendsClick, menuItems }: MobileSidebarDrawerProps) {
  return (
    <div className={`fixed inset-0 z-[100] sm:hidden transition-all duration-300 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <nav
        className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-2xl flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2 font-medium p-4 flex-1 overflow-y-auto">
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
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* Online contacts slider */}
        {onlineContacts.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400 font-semibold">Online Now</div>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1">
              {onlineContacts.map((contact, idx) => (
                <div key={idx} className="relative flex-shrink-0">
                  <FallbackImage
                    src={contact.avatar}
                    alt={contact.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-gray-800"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
} 