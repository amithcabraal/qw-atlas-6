import React from 'react';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add contact form submission logic here
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <Mail className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="text-3xl font-bold text-white mt-4">Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 
                       rounded-md text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 
                       rounded-md text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 
                       rounded-md text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg font-medium transition-colors
                     flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
