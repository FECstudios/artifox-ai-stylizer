import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AIGeneration: React.FC = () => {
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
        <h1 className="text-4xl font-bold">Choose your AI Tool</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/ai-generation/image-generator" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Image Generator" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Image Generator</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/style-transfer" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Style Transfer" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Style Transfer</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/enhance-photo" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Photo Enhancer" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />  
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Photo Enhancer</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/remove-background" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Background Remover" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Background Remover</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/colorize" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Photo Colorizer" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Photo Colorizer</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/face-swap" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Face Swap" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Face Swap</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/upscale" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Image Upscaler" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Image Upscaler</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/anime-converter" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Anime Converter" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Anime Converter</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/sketch-to-art" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Sketch to Art" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Sketch to Art</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/age-progression" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Age Progression" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Age Progression</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/object-removal" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Object Removal" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Object Removal</h2>
            </div>
          </div>
        </Link>
        <Link to="/ai-generation/logo-generator" className="block group">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src="/placeholder.svg" alt="Logo Generator" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Logo Generator</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AIGeneration;
