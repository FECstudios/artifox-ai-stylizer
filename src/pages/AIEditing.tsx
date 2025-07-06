
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

  const tools = [
    {
      title: "Clarity",
      description: "Enhance image clarity and sharpness locally",
      link: "/ai-editing/clarity",
      image: "/placeholder.svg"
    },
    {
      title: "AI Restoration",
      description: "Restore old or damaged photos with AI",
      link: "/ai-editing/restoration", 
      image: "/placeholder.svg"
    },
    {
      title: "Local Editor",
      description: "Basic image editing tools (filters, transforms)",
      link: "/ai-editing/local-editor",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Choose your AI Editing Tool</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Credits: {userCredits}</span>
            <Link to="/ai-generation">
              <Button variant="outline">AI Generation</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.link} className="block group">
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={tool.image} 
                alt={tool.title} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-white text-2xl font-bold mb-2">{tool.title}</h2>
                <p className="text-white text-sm opacity-90">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AIEditing;
