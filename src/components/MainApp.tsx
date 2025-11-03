import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Feed from '@/components/Feed';
import Profile from '@/components/Profile';
import Chat from '@/components/Chat';

interface MainAppProps {
  currentUser: any;
}

type View = 'feed' | 'profile' | 'chat';

export default function MainApp({ currentUser }: MainAppProps) {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const openChat = (user: any) => {
    setSelectedChat(user);
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#1A1F2C] text-white px-4 py-3 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-lilita text-2xl md:text-3xl">Alex CA</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant={currentView === 'feed' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentView('feed')}
              className="font-lilita text-white hover:text-white"
              size="sm"
            >
              <Icon name="Home" size={20} className="mr-1" />
              <span className="hidden sm:inline">Лента</span>
            </Button>
            
            <Button
              variant={currentView === 'chat' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentView('chat')}
              className="font-lilita text-white hover:text-white"
              size="sm"
            >
              <Icon name="MessageCircle" size={20} className="mr-1" />
              <span className="hidden sm:inline">Чаты</span>
            </Button>

            <Button
              variant={currentView === 'profile' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentView('profile')}
              className="font-lilita p-2"
              size="sm"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-4">
        {currentView === 'feed' && <Feed currentUser={currentUser} onOpenChat={openChat} />}
        {currentView === 'profile' && <Profile currentUser={currentUser} />}
        {currentView === 'chat' && <Chat currentUser={currentUser} selectedChat={selectedChat} />}
      </main>
    </div>
  );
}
