import { ArrowLeft, Image as ImageIcon, Video, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryScreenProps {
  onNavigate: (screen: string) => void;
}

const galleryItems = [
  { 
    id: 1, 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1726931716456-b35974ef0fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE4NDYxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  { 
    id: 2, 
    type: 'video', 
    url: 'https://images.unsplash.com/photo-1662462941792-628885155848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBsaWZlc3R5bGUlMjBwaG90b3xlbnwxfHx8fDE3NjE4NDYxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  { 
    id: 3, 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1611867416174-38de72f3fc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBob3VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNzY2NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  { 
    id: 4, 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1642610219006-7ab6a78b6dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYxNzkxNzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  { 
    id: 5, 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1515462946277-fe57a21d5dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwbGlnaHQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4NDYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  { 
    id: 6, 
    type: 'video', 
    url: 'https://images.unsplash.com/flagged/photo-1572022527856-d1520f803066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYWVzdGhldGljJTIwcGhvdG98ZW58MXx8fHwxNzYxODQ2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function GalleryScreen({ onNavigate }: GalleryScreenProps) {
  return (
    <div className="min-h-screen bg-[#F6F4DF] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#F6F4DF] px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
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
            gallery
          </h1>
          
          <div className="w-10" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-2 bg-[#1B2021] whitespace-nowrap transition-opacity hover:opacity-90">
            <span 
              className="text-[#F6F4DF]"
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '0.75rem', 
                fontWeight: '400',
                letterSpacing: '-0.01em'
              }}
            >
              all
            </span>
          </button>
          <button className="px-4 py-2 bg-white whitespace-nowrap transition-opacity hover:opacity-80">
            <span 
              className="text-[#51513D]"
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '0.75rem', 
                fontWeight: '400',
                letterSpacing: '-0.01em'
              }}
            >
              photos
            </span>
          </button>
          <button className="px-4 py-2 bg-white whitespace-nowrap transition-opacity hover:opacity-80">
            <span 
              className="text-[#51513D]"
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '0.75rem', 
                fontWeight: '400',
                letterSpacing: '-0.01em'
              }}
            >
              videos
            </span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-3">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate('editor')}
              className="relative aspect-[3/4] overflow-hidden bg-white transition-opacity hover:opacity-80"
            >
              <ImageWithFallback
                src={item.url}
                alt={`Gallery item ${item.id}`}
                className="w-full h-full object-cover"
              />
              
              {/* Type indicator */}
              <div className="absolute top-3 right-3 p-2 bg-white">
                {item.type === 'video' ? (
                  <Video className="w-3 h-3 text-[#1B2021]" strokeWidth={1.5} />
                ) : (
                  <ImageIcon className="w-3 h-3 text-[#1B2021]" strokeWidth={1.5} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed bottom-8 right-6 p-4 bg-[#1B2021] transition-opacity hover:opacity-90"
      >
        <Plus className="w-6 h-6 text-[#F6F4DF]" strokeWidth={1.5} />
      </button>
    </div>
  );
}
