import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import MainApp from '@/components/MainApp';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen">
      {!isLoggedIn ? (
        <WelcomeScreen onLogin={handleLogin} />
      ) : (
        <MainApp currentUser={currentUser} />
      )}
    </div>
  );
}
