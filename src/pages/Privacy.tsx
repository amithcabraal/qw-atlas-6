import React from 'react';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <Shield className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="text-3xl font-bold text-white mt-4">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-gray-200">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data Collection</h2>
            <p>
              We only collect the minimum amount of data necessary to run the game:
              your chosen initials and game scores. We do not collect any personal
              information or tracking data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data Usage</h2>
            <p>
              Your game data is only used to facilitate gameplay and maintain
              leaderboards. We do not share or sell any user data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data Storage</h2>
            <p>
              Game data is stored temporarily and is automatically deleted after
              the game ends. Your initials and scores are not permanently stored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
            <p>
              If you have any questions about our privacy policy, please contact
              us through the Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
