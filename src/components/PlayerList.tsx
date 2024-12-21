import React from 'react';
import { User, CheckCircle2, Trophy } from 'lucide-react';

interface Player {
  id: string;
  initials: string;
  score: number;
  has_answered: boolean;
  game_id: string;
  lastScore?: number;
}

interface PlayerListProps {
  players: Player[];
  showAnswered?: boolean;
  isGameComplete?: boolean;
}

export default function PlayerList({ 
  players, 
  showAnswered = false,
  isGameComplete = false 
}: PlayerListProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = isGameComplete ? sortedPlayers[0] : null;

  return (
    <div className="space-y-2">
      {sortedPlayers.map((player, index) => (
        <div
          key={player.id}
          className={`flex items-center justify-between p-3 rounded-lg
            ${winner?.id === player.id 
              ? 'bg-yellow-500/20 border border-yellow-500/50' 
              : 'bg-white/10'}`}
        >
          <div className="flex items-center gap-2">
            {isGameComplete && index === 0 && (
              <Trophy className="w-5 h-5 text-yellow-400" />
            )}
            <User className="w-5 h-5 text-gray-300" />
            <span className="font-medium text-white">{player.initials}</span>
          </div>
          <div className="flex items-center gap-2">
            {showAnswered && (
              <CheckCircle2 
                className={`w-5 h-5 ${
                  player.has_answered ? 'text-green-400' : 'text-gray-400'
                }`} 
              />
            )}
            <div className="text-right">
              <span className="font-mono text-white">{player.score}</span>
              {player.lastScore !== undefined && player.score > player.lastScore && (
                <span className="font-mono text-green-400 text-sm ml-1">
                  +{player.score - player.lastScore}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      {isGameComplete && winner && (
        <div className="mt-6 text-center bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
          <h3 className="text-xl font-bold text-white mb-2">
            🎉 {winner.initials} Wins! 🎉
          </h3>
          <p className="text-yellow-300">
            Final Score: {winner.score} points
          </p>
        </div>
      )}
    </div>
  );
}
