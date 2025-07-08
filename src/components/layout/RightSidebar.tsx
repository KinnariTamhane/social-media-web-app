'use client';

import FallbackImage from '@/components/common/FallbackImage';
import contacts from '@/data/contacts';

const sponsoredItems = [
  {
    title: 'Start your business today',
    company: 'businessgrowth.com',
    imageUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    title: 'Learn new skills online',
    company: 'eduplatform.com',
    imageUrl: 'https://picsum.photos/200/200?random=2'
  }
];

const onlineContacts = contacts.filter((c) => c.status === 'online');

export default function RightSidebar() {
  return (
    <aside className="fixed top-[3.75rem] right-0 z-40 w-64 h-screen transition-transform translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 scrollbar-hide">
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sponsored</h2>
          {sponsoredItems.map((item, index) => (
            <div key={index} className="mb-4 cursor-pointer">
              <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden">
                <FallbackImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.company}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Online Friends</h2>
          <ul className="space-y-3">
            {onlineContacts.map((contact, index) => (
              <li key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                <div className="relative">
                  <FallbackImage
                    src={contact.avatar}
                    alt={contact.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}