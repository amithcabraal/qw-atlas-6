import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Share2, Home } from 'lucide-react';
import PlayerList from './PlayerList';
import { clearGameState } from '../lib/gameUtils';

interface GameCompleteProps {
  players: Array<{
    id: string;
    initials: string;
    score: number;
    has_answered: boolean;
  }>;
}

export default function GameComplete({ players }: GameCompleteProps) {
  const navigate = useNavigate();
  const winner = [...players].sort((a, b) => b.score - a.score)[0];

  const handleShare = async () => {
    const text = `I just scored ${winner.score} points in QuizWordz Atlas! Can you beat my score?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuizWordz Atlas Score',
          text,
          url: window.location.origin
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Results copied to clipboard!');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  const handlePlayAgain = () => {
    clearGameState();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white mt-4">Game Complete!</h1>
          {winner && (
            <p className="text-yellow-300 mt-2">
              🎉 {winner.initials} wins with {winner.score} points! 🎉
            </p>
          )}
        </div>

        <PlayerList 
          players={players} 
          isGameComplete={true}
        />

        <div className="mt-8 space-y-4">
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg font-medium transition-colors
                     flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </button>

          <button
            onClick={handlePlayAgain}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 
                     text-white rounded-lg font-medium transition-colors
                     flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Play Again
          </button>

          <Link
            to="/"
            className="block w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 
                     text-white rounded-lg font-medium transition-colors
                     text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
