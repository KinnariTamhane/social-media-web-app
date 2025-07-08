'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar, { menuItems } from '@/components/layout/Sidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import ContactsPopup from '@/components/common/ContactsPopup';
import contacts from '@/data/contacts';
import MobileSidebarDrawer from '@/components/layout/MobileSidebarDrawer';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [showContactsPopup, setShowContactsPopup] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const handleFriendsClick = () => {
    setShowContactsPopup(true);
    setShowMobileDrawer(false); // close drawer if open
  };

  return (
    <>
      <Navbar onAvatarClick={() => setShowMobileDrawer(true)} />
      <Sidebar onFriendsClick={handleFriendsClick} />
      <MobileSidebarDrawer
        open={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
        onFriendsClick={handleFriendsClick}
        menuItems={menuItems}
      />
      <main className="p-4 sm:pl-64 sm:pr-64 mt-[3.75rem] w-full overflow-x-hidden relative">
        {showContactsPopup && (
          <>
            {/* Blurred overlay */}
            <div className="fixed inset-0 sm:pl-64 sm:pr-64 z-40 flex justify-center pointer-events-none">
              <div className="w-full max-w-2xl mx-auto h-full backdrop-blur-md bg-black/20" />
            </div>
            {/* Centered Modal */}
            <div className="fixed inset-0 sm:pl-64 sm:pr-64 z-50 flex items-center justify-center">
              <div className="w-full max-w-2xl mx-auto">
                <ContactsPopup 
                  isOpen={showContactsPopup} 
                  onClose={() => setShowContactsPopup(false)} 
                  contacts={contacts} 
                />
              </div>
            </div>
          </>
        )}
        {children}
      </main>
      <RightSidebar />
    </>
  );
} 