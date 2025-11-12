import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { EditorScreen } from './components/EditorScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 'splash' | 'home' | 'editor' | 'gallery' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  useEffect(() => {
    // Auto-transition from splash to home after 2 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen overflow-hidden bg-[#F6F4DF]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Custom scrollbar styling */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Remove tap highlight */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <div className="transition-opacity duration-300">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
        {currentScreen === 'editor' && <EditorScreen onNavigate={handleNavigate} />}
        {currentScreen === 'gallery' && <GalleryScreen onNavigate={handleNavigate} />}
        {currentScreen === 'settings' && <SettingsScreen onNavigate={handleNavigate} />}
      </div>
    </div>
  );
}
