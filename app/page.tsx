'use client'

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonText, setNoButtonText] = useState('No');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noButtonTexts = [
    'No',
    'Really?',
    'Pakka?',
    'Sure?',
    'Bahut marungag!',
    'Think again!',
    'Not happening!',
    'Nope nope!',
    'Seriously?',
    'Final answer?'
  ];

  useEffect(() => {
    if (!isPositioned && noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({ x: rect.left, y: rect.top });
      setIsPositioned(true);
    }
  }, [isPositioned]);

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    const randomText = noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)];
    setNoButtonText(randomText);

    // Get button dimensions
    const buttonWidth = 150;
    const buttonHeight = 60;
    
    // Calculate safe boundaries
    const maxX = window.innerWidth - buttonWidth - 20;
    const maxY = window.innerHeight - buttonHeight - 20;
    
    const newX = Math.max(10, Math.random() * maxX);
    const newY = Math.max(10, Math.random() * maxY);
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    moveNoButton(e);
  };

  const handleNoMouseEnter = (e: React.MouseEvent) => {
    // Only trigger on desktop (when hover is available)
    if (window.matchMedia('(hover: hover)').matches) {
      moveNoButton(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              opacity: 0.3
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {!showCelebration ? (
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-8 animate-pulse">
            💝
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12">
            Will you be my Valentine?
          </h2>
          
          <div className="flex gap-8 justify-center items-center relative min-h-[80px]">
            <button
              onClick={handleYesClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-2xl transform hover:scale-110 transition-all duration-200 shadow-lg"
            >
              Yes! 💕
            </button>

            {!isPositioned ? (
              <button
                ref={noButtonRef}
                onMouseEnter={handleNoMouseEnter}
                onClick={handleNoClick}
                onTouchStart={handleNoClick}
                className="bg-red-500 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg cursor-pointer touch-none select-none"
              >
                {noButtonText}
              </button>
            ) : (
              <button
                onMouseEnter={handleNoMouseEnter}
                onClick={handleNoClick}
                onTouchStart={handleNoClick}
                className="bg-red-500 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg cursor-pointer fixed transition-all duration-300 ease-out touch-none select-none z-20"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                }}
              >
                {noButtonText}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center z-10 animate-bounce-in">
          <div className="text-8xl mb-8 animate-spin-slow">🎉</div>
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-6">
            Yay! 💖
          </h1>
          <p className="text-3xl md:text-4xl text-gray-800 mb-8">
            You made my day! ❤️
          </p>
          
          {/* Celebration confetti */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                {['❤️', '💕', '💖', '💗', '💝', '🌹', '💐'][Math.floor(Math.random() * 7)]}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        .animate-confetti {
          animation: confetti forwards ease-in;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}