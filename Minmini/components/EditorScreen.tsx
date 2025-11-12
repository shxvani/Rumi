import { useState } from 'react';
import { ArrowLeft, RotateCcw, Download, Eye, Sparkles, Sun, Moon, Droplet, Contrast } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EditorScreenProps {
  onNavigate: (screen: string) => void;
}

const filters = [
  { id: 'none', name: 'original' },
  { id: 'warm', name: 'warm' },
  { id: 'golden', name: 'golden' },
  { id: 'sage', name: 'sage' },
  { id: 'vintage', name: 'vintage' },
  { id: 'soft', name: 'soft' },
  { id: 'mocha', name: 'mocha' },
  { id: 'cream', name: 'cream' },
  { id: 'linen', name: 'linen' },
  { id: 'honey', name: 'honey' },
  { id: 'olive', name: 'olive' },
  { id: 'sand', name: 'sand' },
  { id: 'pearl', name: 'pearl' },
  { id: 'wheat', name: 'wheat' },
  { id: 'terra', name: 'terra' },
  { id: 'mist', name: 'mist' },
  { id: 'dawn', name: 'dawn' },
  { id: 'dusk', name: 'dusk' },
  { id: 'glow', name: 'glow' },
  { id: 'amber', name: 'amber' },
];

const tools = [
  { id: 'filters', name: 'filters', icon: Sparkles },
  { id: 'brightness', name: 'brightness', icon: Sun },
  { id: 'contrast', name: 'contrast', icon: Contrast },
  { id: 'saturation', name: 'saturation', icon: Droplet },
  { id: 'warmth', name: 'warmth', icon: Moon },
];

export function EditorScreen({ onNavigate }: EditorScreenProps) {
  const [selectedTool, setSelectedTool] = useState<string>('filters');
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [warmth, setWarmth] = useState(50);
  const [selectedFilter, setSelectedFilter] = useState('none');

  const getValue = () => {
    switch (selectedTool) {
      case 'brightness': return brightness;
      case 'contrast': return contrast;
      case 'saturation': return saturation;
      case 'warmth': return warmth;
      default: return 50;
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    switch (selectedTool) {
      case 'brightness': setBrightness(value); break;
      case 'contrast': setContrast(value); break;
      case 'saturation': setSaturation(value); break;
      case 'warmth': setWarmth(value); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4DF] flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-[#F6F4DF]">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="w-6 h-6 text-[#1B2021]" strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-2">
          <button className="p-2 transition-opacity hover:opacity-70">
            <Eye className="w-6 h-6 text-[#1B2021]" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
              setBrightness(50);
              setContrast(50);
              setSaturation(50);
              setWarmth(50);
              setSelectedFilter('none');
            }}
            className="p-2 transition-opacity hover:opacity-70"
          >
            <RotateCcw className="w-6 h-6 text-[#1B2021]" strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-[#1B2021] transition-opacity hover:opacity-90">
            <Download className="w-6 h-6 text-[#F6F4DF]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Image Preview - 75% of screen */}
      <div className="flex-[3] relative bg-[#1B2021] flex items-center justify-center p-6">
        <div className="w-full h-full max-w-2xl overflow-hidden bg-white">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726931716456-b35974ef0fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE4NDYxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Control Area - 25% of screen */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Slider area */}
        {selectedTool !== 'filters' && (
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-[#51513D]"
                style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '0.75rem', 
                  fontWeight: '400',
                  letterSpacing: '-0.01em'
                }}
              >
                {selectedTool}
              </span>
              <span 
                className="text-[#1B2021]"
                style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '0.75rem', 
                  fontWeight: '500',
                  letterSpacing: '-0.01em'
                }}
              >
                {getValue()}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={getValue()}
                onChange={handleSliderChange}
                className="w-full h-1 bg-[#F6F4DF] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#1B2021] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-[#1B2021] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tool icons */}
        <div className="px-6 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`flex flex-col items-center gap-2 px-5 py-3 transition-colors whitespace-nowrap ${
                  selectedTool === tool.id
                    ? 'bg-[#1B2021]'
                    : 'bg-[#F6F4DF]'
                }`}
              >
                <tool.icon 
                  className={selectedTool === tool.id ? 'text-[#F6F4DF]' : 'text-[#51513D]'} 
                  size={20}
                  strokeWidth={1.5}
                />
                <span
                  className={selectedTool === tool.id ? 'text-[#F6F4DF]' : 'text-[#51513D]'}
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontSize: '0.625rem', 
                    fontWeight: '400',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter thumbnails */}
        {selectedTool === 'filters' && (
          <div className="px-6 pb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                >
                  <div className={`w-16 h-20 overflow-hidden bg-[#F6F4DF] ${
                    selectedFilter === filter.id ? 'ring-2 ring-[#1B2021] ring-offset-2 ring-offset-white' : ''
                  }`}>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1726931716456-b35974ef0fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE4NDYxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt={filter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className={`text-center mt-1 ${selectedFilter === filter.id ? 'text-[#1B2021]' : 'text-[#51513D]'}`}
                    style={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      fontSize: '0.625rem', 
                      fontWeight: '400',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {filter.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
