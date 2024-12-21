import { useState, useCallback } from 'react';

export function useGameSharing() {
  const [copied, setCopied] = useState(false);

  const shareGame = useCallback(async (gameCode: string) => {
    const shareUrl = `${window.location.origin}/join/${gameCode}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }, []);

  return { shareGame, copied };
}
