import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} ImpactMojo. All Rights Reserved.</p>
      <div className="flex items-center justify-center text-sm mt-2">
        <span>Made possible by </span>
        <a 
          href="https://www.pinpointventures.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 mx-1"
        >
          PinPoint Ventures
        </a>
        <Heart className="text-red-400" size={16} />
      </div>
    </div>
  </footer>
);

export default Footer;
