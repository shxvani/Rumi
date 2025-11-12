import { Image, Video, Grid3x3, Settings } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#F6F4DF] px-8 py-12 flex flex-col">
      {/* Header */}
      <div className="mb-16">
        <h1 
          className="text-[#1B2021] tracking-tight mb-2"
          style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '1.75rem', 
            fontWeight: '300',
            letterSpacing: '-0.02em'
          }}
        >
          minmini
        </h1>
        <p 
          className="text-[#51513D]"
          style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '0.875rem', 
            fontWeight: '300',
            letterSpacing: '-0.01em'
          }}
        >
          edit with light
        </p>
      </div>

      {/* Main action cards */}
      <div className="flex-1 flex flex-col gap-6 mb-24">
        {/* Edit Photo Card */}
        <button
          onClick={() => onNavigate('editor')}
          className="w-full bg-[#A6A867] p-12 flex flex-col items-center justify-center gap-4 transition-opacity hover:opacity-90 active:opacity-80"
        >
          <Image className="w-12 h-12 text-[#F6F4DF]" strokeWidth={1.5} />
          <span 
            className="text-[#F6F4DF]"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '1rem', 
              fontWeight: '400',
              letterSpacing: '-0.01em'
            }}
          >
            edit photo
          </span>
        </button>

        {/* Edit Video Card */}
        <button
          onClick={() => onNavigate('editor')}
          className="w-full bg-[#51513D] p-12 flex flex-col items-center justify-center gap-4 transition-opacity hover:opacity-90 active:opacity-80"
        >
          <Video className="w-12 h-12 text-[#F6F4DF]" strokeWidth={1.5} />
          <span 
            className="text-[#F6F4DF]"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '1rem', 
              fontWeight: '400',
              letterSpacing: '-0.01em'
            }}
          >
            edit video
          </span>
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-8 left-8 right-8 bg-white p-4 flex items-center justify-around">
        <button className="p-3 bg-[#1B2021] transition-opacity hover:opacity-90">
          <Image className="w-5 h-5 text-[#F6F4DF]" strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => onNavigate('gallery')}
          className="p-3 transition-opacity hover:opacity-90"
        >
          <Grid3x3 className="w-5 h-5 text-[#51513D]" strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className="p-3 transition-opacity hover:opacity-90"
        >
          <Settings className="w-5 h-5 text-[#51513D]" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
