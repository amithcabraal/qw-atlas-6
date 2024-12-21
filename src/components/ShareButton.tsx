import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onClick: () => void;
  copied: boolean;
  className?: string;
}

export default function ShareButton({ onClick, copied, className = '' }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg 
                 text-white font-medium transition-colors flex items-center 
                 justify-center gap-2 ${className}`}
    >
      <Share2 className="w-5 h-5" />
      {copied ? 'Link Copied!' : 'Share Game Link'}
    </button>
  );
}
