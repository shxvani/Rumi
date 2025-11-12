import { ArrowLeft, Info, Star, Palette, Shield, ChevronRight } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const settingsItems = [
  {
    id: 'about',
    title: 'about',
    description: 'version 1.0.0',
    icon: Info,
  },
  {
    id: 'rate',
    title: 'rate us',
    description: 'share your experience',
    icon: Star,
  },
  {
    id: 'theme',
    title: 'theme',
    description: 'light • dark • auto',
    icon: Palette,
  },
  {
    id: 'privacy',
    title: 'privacy policy',
    description: 'your data, your control',
    icon: Shield,
  },
];

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-[#F6F4DF] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#F6F4DF] px-6 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="w-6 h-6 text-[#1B2021]" strokeWidth={1.5} />
          </button>
          
          <h1 
            className="text-[#1B2021]"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '1rem', 
              fontWeight: '400',
              letterSpacing: '-0.01em'
            }}
          >
            settings
          </h1>
          
          <div className="w-10" />
        </div>
      </div>

      {/* App info */}
      <div className="px-6 mb-12">
        <div className="bg-white p-8 text-center">
          <h2 
            className="text-[#1B2021] mb-2"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '1.5rem', 
              fontWeight: '300',
              letterSpacing: '-0.02em'
            }}
          >
            minmini
          </h2>
          <p 
            className="text-[#51513D]"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '0.875rem', 
              fontWeight: '300',
              letterSpacing: '-0.01em'
            }}
          >
            light in every moment
          </p>
        </div>
      </div>

      {/* Settings list */}
      <div className="px-6 space-y-3">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            className="w-full bg-white p-6 transition-opacity hover:opacity-80"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="p-3 bg-[#F6F4DF]">
                <item.icon className="w-5 h-5 text-[#1B2021]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <h3 
                  className="text-[#1B2021] mb-1"
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontSize: '0.875rem', 
                    fontWeight: '400',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-[#51513D]"
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontSize: '0.75rem', 
                    fontWeight: '300',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-[#51513D]" strokeWidth={1.5} />
            </div>
          </button>
        ))}
      </div>

      {/* Footer info */}
      <div className="px-6 mt-12">
        <div className="bg-white p-6 text-center">
          <p 
            className="text-[#51513D] mb-1"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '0.75rem', 
              fontWeight: '300',
              letterSpacing: '-0.01em'
            }}
          >
            made with minimalism
          </p>
          <p 
            className="text-[#A6A867]"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '0.625rem', 
              fontWeight: '300',
              letterSpacing: '-0.01em'
            }}
          >
            french elegance • tamil heart
          </p>
        </div>
      </div>

      {/* Action links */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-center gap-3">
          {['help', 'feedback', 'share'].map((link) => (
            <button
              key={link}
              className="px-4 py-2 bg-white transition-opacity hover:opacity-80"
            >
              <span 
                className="text-[#51513D]"
                style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '0.75rem', 
                  fontWeight: '400',
                  letterSpacing: '-0.01em'
                }}
              >
                {link}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
