'use client';

import { useState, useEffect, useRef } from 'react';
import FallbackImage from '@/components/common/FallbackImage';
import { FaTimes } from 'react-icons/fa';

interface Contact {
  name: string;
  status: string;
  avatar: string;
}

interface ContactsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
}

export default function ContactsPopup({ isOpen, onClose, contacts }: ContactsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[70vh] sm:max-h-[70vh] overflow-hidden px-2 sm:px-0">
      <div 
        ref={popupRef}
        className="w-full h-full flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Friend List</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 scrollbar-hide" style={{ maxHeight: '50vh' }}>
          <ul className="space-y-3">
            {contacts.map((contact, index) => (
              <li key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <div className="relative">
                  <FallbackImage
                    src={contact.avatar}
                    alt={contact.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900 dark:text-white block truncate">{contact.name}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.status === 'online' ? 'Active now' : 'Offline'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}