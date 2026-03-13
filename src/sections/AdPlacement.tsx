import { useEffect, useRef, useState } from 'react';

interface AdPlacementProps {
  size?: 'banner' | 'rectangle' | 'skyscraper';
}

export function AdPlacement({ size = 'banner' }: AdPlacementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    banner: 'w-full max-w-[728px] h-[90px]',
    rectangle: 'w-full max-w-[336px] h-[280px]',
    skyscraper: 'w-full max-w-[160px] h-[600px]',
  };

  return (
    <div
      ref={adRef}
      className={`relative mx-auto my-8 ${sizeClasses[size]}`}
    >
      {/* Corner Brackets Animation */}
      {isVisible && (
        <>
          {/* Top Left */}
          <svg
            className="absolute -top-2 -left-2 w-6 h-6 text-[#00ACE7]/30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 12V2h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-draw"
              style={{ strokeDasharray: 20, strokeDashoffset: 0 }}
            />
          </svg>
          {/* Top Right */}
          <svg
            className="absolute -top-2 -right-2 w-6 h-6 text-[#00ACE7]/30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 12V2H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {/* Bottom Left */}
          <svg
            className="absolute -bottom-2 -left-2 w-6 h-6 text-[#00ACE7]/30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 12v10h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {/* Bottom Right */}
          <svg
            className="absolute -bottom-2 -right-2 w-6 h-6 text-[#00ACE7]/30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 12v10H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </>
      )}

      {/* Ad Container */}
      <div
        className={`w-full h-full bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
          Advertisement
        </span>
        <div className="text-center px-4">
          <p className="text-sm text-gray-500">
            {size === 'banner' && '728x90 Banner Ad'}
            {size === 'rectangle' && '336x280 Rectangle Ad'}
            {size === 'skyscraper' && '160x600 Skyscraper Ad'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Google AdSense Ready
          </p>
        </div>
      </div>

      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-xl bg-[#00ACE7]/5 animate-pulse pointer-events-none" />
    </div>
  );
}
