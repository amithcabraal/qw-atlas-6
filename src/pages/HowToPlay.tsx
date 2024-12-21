import React from 'react';
import { MapPin } from 'lucide-react';

export default function HowToPlay() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">How to Play</h1>
        
        <div className="space-y-6 text-gray-200">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Game Overview</h2>
            <p>
              QuizWordz Atlas is a geography quiz game where players guess the location
              of famous landmarks and places around the world.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Game Rules</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Each game consists of 5 random questions</li>
              <li>Click on the map to place your guess for each location</li>
              <li>Points are awarded based on how close your guess is to the actual location</li>
              <li>The closer your guess, the more points you earn</li>
              <li>All players must answer before the results are revealed</li>
              <li>The player with the most points at the end wins!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Scoring</h2>
            <p>
              Points are calculated based on the distance between your guess and the actual location:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Perfect guess (within 10km): 1000 points</li>
              <li>Very close (within 100km): 750-999 points</li>
              <li>Close (within 500km): 500-749 points</li>
              <li>Far (within 1000km): 250-499 points</li>
              <li>Very far (over 1000km): 0-249 points</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
