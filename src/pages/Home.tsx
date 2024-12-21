import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, History } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SavedGame {
  gameId: string;
  playerId: string;
  gameCode: string;
  timestamp: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [savedGame, setSavedGame] = useState<SavedGame | null>(null);

  useEffect(() => {
    const checkSavedGame = async () => {
      const saved = localStorage.getItem('lastGame');
      if (saved) {
        const game: SavedGame = JSON.parse(saved);
        
        // Check if the game is still active
        const { data, error } = await supabase
          .from('games')
          .select('status')
          .eq('id', game.gameId)
          .single();

        if (!error && data && data.status !== 'finished') {
          setSavedGame(game);
        } else {
          localStorage.removeItem('lastGame');
        }
      }
    };

    checkSavedGame();
  }, []);

  const handleResume = () => {
    if (savedGame) {
      navigate(`/play/${savedGame.gameId}?role=player&playerId=${savedGame.playerId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Globe2 className="mx-auto h-16 w-16 text-blue-400" />
          <h1 className="mt-6 text-4xl font-bold text-white">GeoQuiz Master</h1>
          <p className="mt-2 text-lg text-gray-300">Test your geography knowledge!</p>
        </div>

        <div className="space-y-4">
          {savedGame && (
            <button
              onClick={handleResume}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white 
                       rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <History className="w-5 h-5" />
              Resume Previous Game
            </button>
          )}
          
          <button
            onClick={() => navigate('/host')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white 
                     rounded-lg font-medium transition-colors"
          >
            Host a Game
          </button>
          
          <button
            onClick={() => navigate('/join')}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white 
                     rounded-lg font-medium transition-colors"
          >
            Join a Game
          </button>
        </div>
      </div>
    </div>
  );
}
