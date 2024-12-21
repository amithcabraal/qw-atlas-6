import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HostGame from './pages/HostGame';
import JoinGame from './pages/JoinGame';
import JoinManual from './pages/JoinManual';
import PlayGame from './pages/PlayGame';
import HowToPlay from './pages/HowToPlay';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import MapDemo from './pages/MapDemo';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<HostGame />} />
            <Route path="/join" element={<JoinManual />} />
            <Route path="/join/:gameCode" element={<JoinGame />} />
            <Route path="/play/:gameId" element={<PlayGame />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mapdemo" element={<MapDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;