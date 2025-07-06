
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AIEditing: React.FC = () => {
  const { session, signOut, profile } = useAuth();
  const userCredits = profile?.credits ?? 0;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Choose your AI Editing Tool</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/ai-editing/clarity" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Clarity AI" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Clarity</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/restoration" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="AI Restoration" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">AI Restoration</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/enhance" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Enhance Photo" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Enhance Photo</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/remove-bg" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Remove Background" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Remove BG</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/colorize" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Colorize" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Colorize</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/style-transfer" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Style Transfer" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Style Transfer</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/upscale" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Upscale" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Upscale</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-editing/local-editor" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Local Editor" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">Local Editor</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AIEditing;
