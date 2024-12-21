import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useGameActions(gameId: string | undefined, questionsLength: number) {
  const [error, setError] = useState<string | null>(null);

  const handleNextQuestion = async (currentQuestion: number) => {
    if (!gameId) return;

    try {
      const nextQuestion = currentQuestion + 1;
      
      if (nextQuestion >= questionsLength) {
        await supabase
          .from('games')
          .update({ 
            status: 'finished',
            current_question: questionsLength - 1
          })
          .eq('id', gameId);
      } else {
        // Update game status and move to next question
        await supabase
          .from('games')
          .update({
            current_question: nextQuestion,
            status: 'playing'
          })
          .eq('id', gameId);

        // Reset player answers
        await supabase
          .from('players')
          .update({ has_answered: false })
          .eq('game_id', gameId);
      }
    } catch (err) {
      console.error('Error advancing to next question:', err);
      setError('Failed to advance to next question');
    }
  };

  const handleRevealAnswers = async (currentQuestion: number) => {
    if (!gameId) return;

    try {
      // Update game status to revealing
      const { error: updateError } = await supabase
        .from('games')
        .update({ status: 'revealing' })
        .eq('id', gameId);

      if (updateError) throw updateError;
    } catch (err) {
      console.error('Error revealing answers:', err);
      setError('Failed to reveal answers');
    }
  };

  return {
    handleNextQuestion,
    handleRevealAnswers,
    error
  };
}
