import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import HostView from '../components/HostView';
import PlayerView from '../components/PlayerView';
import GameComplete from '../components/GameComplete';
import { useGameActions } from '../hooks/useGameActions';

export default function PlayGame() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const playerId = searchParams.get('playerId');

  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { handleNextQuestion, handleRevealAnswers, error: actionError } = useGameActions(gameId);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!gameId) return;

      try {
        setLoading(true);
        // Fetch game data
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select()
          .eq('id', gameId)
          .single();

        if (gameError) throw gameError;
        setGame(gameData);

        // Fetch players
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select()
          .eq('game_id', gameId);

        if (playersError) throw playersError;
        setPlayers(playersData || []);

        if (playerId) {
          const player = playersData?.find(p => p.id === playerId) || null;
          setCurrentPlayer(player);
        }

        // Fetch answers for current question if game is in revealing state
        if (gameData.status === 'revealing') {
          const { data: answersData } = await supabase
            .from('answers')
            .select()
            .eq('game_id', gameId)
            .eq('question_id', gameData.current_question);
          
          if (answersData) {
            setAnswers(answersData);
          }
        }

        // Set up real-time subscriptions
        const gameChannel = supabase.channel(`game-${gameId}`)
          .on(
            'postgres_changes',
            { 
              event: '*', 
              schema: 'public', 
              table: 'games',
              filter: `id=eq.${gameId}`
            },
            async (payload) => {
              const updatedGame = payload.new;
              setGame(updatedGame);

              // Clear answers when moving to next question
              if (updatedGame.status === 'playing') {
                setAnswers([]);
              }

              // Fetch new answers when revealing
              if (updatedGame.status === 'revealing') {
                const { data: newAnswers } = await supabase
                  .from('answers')
                  .select()
                  .eq('game_id', gameId)
                  .eq('question_id', updatedGame.current_question);
                
                if (newAnswers) {
                  setAnswers(newAnswers);
                }
              }
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'players',
              filter: `game_id=eq.${gameId}`
            },
            (payload) => {
              if (payload.eventType === 'UPDATE') {
                setPlayers(current => 
                  current.map(p => 
                    p.id === payload.new.id ? payload.new : p
                  )
                );
                if (playerId && payload.new.id === playerId) {
                  setCurrentPlayer(payload.new);
                }
              } else if (payload.eventType === 'INSERT') {
                setPlayers(current => [...current, payload.new]);
              }
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'answers',
              filter: `game_id=eq.${gameId}`
            },
            (payload) => {
              if (payload.eventType === 'INSERT') {
                setAnswers(current => [...current, payload.new]);
              }
            }
          );

        gameChannel.subscribe();
        return () => {
          supabase.removeChannel(gameChannel);
        };
      } catch (err) {
        console.error('Error fetching game data:', err);
        setError('Failed to load game data');
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId, playerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  if (error || actionError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || actionError}</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Game not found</div>
      </div>
    );
  }

  if (game.status === 'finished') {
    return <GameComplete players={players} />;
  }

  // Get current question from the game's questions array
  const currentQuestionData = game.questions?.[game.current_question];
  
  // Handle the case where we've completed all questions
  if (!currentQuestionData && game.current_question >= game.questions?.length) {
    return <GameComplete players={players} />;
  }

  // Handle invalid question state
  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading next question...</div>
      </div>
    );
  }

  if (role === 'host') {
    return (
      <HostView
        gameId={gameId}
        currentQuestion={game.current_question}
        players={players}
        answers={answers}
        onNextQuestion={() => handleNextQuestion(game.current_question)}
        onRevealAnswers={() => handleRevealAnswers(game.current_question)}
        question={currentQuestionData}
      />
    );
  }

  if (role === 'player' && currentPlayer) {
    return (
      <PlayerView
        gameId={gameId}
        playerId={currentPlayer.id}
        question={currentQuestionData}
        questionNumber={game.current_question}
        hasAnswered={currentPlayer.has_answered}
        gameStatus={game.status}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Invalid game state</div>
    </div>
  );
}
