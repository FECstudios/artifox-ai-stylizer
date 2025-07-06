import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import React, { useState } from 'react';

const AIRestoration: React.FC = () => {
  const { session } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setRestoredImageUrl(null);

    const fileName = `${session?.user.id}/${Date.now()}_${selectedFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, selectedFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);

    const { data: restoreData, error: restoreError } = await supabase.functions.invoke(
      'image-restoration',
      {
        body: { imageUrl: urlData.publicUrl },
      }
    );

    if (restoreError) {
      console.error('Error restoring image:', restoreError);
    } else {
      setRestoredImageUrl(restoreData.output);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Image Restoration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input type="file" onChange={handleFileChange} accept="image/*" />
          <Button onClick={handleRestore} disabled={loading || !selectedFile}>
            {loading ? 'Restoring...' : 'Restore Image'}
          </Button>
        </div>
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          {restoredImageUrl ? (
            <img src={restoredImageUrl} alt="Restored Image" className="w-full h-auto rounded-lg shadow-lg" />
          ) : (
            <p className="text-gray-500">Your restored image will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRestoration;
