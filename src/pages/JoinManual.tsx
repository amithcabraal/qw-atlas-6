import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';

export default function JoinManual() {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }
    navigate(`/join/${gameCode.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <KeyRound className="mx-auto h-12 w-12 text-blue-400" />
            <h1 className="mt-4 text-3xl font-bold text-white">Join Game</h1>
            <p className="mt-2 text-gray-300">Enter the game code to join</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="gameCode" className="block text-sm font-medium text-gray-300">
                Game Code
              </label>
              <input
                type="text"
                id="gameCode"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter game code"
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 
                         rounded-md text-white placeholder-gray-400 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         uppercase"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-lg font-medium transition-colors"
            >
              Join Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
