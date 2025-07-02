-- Create uploads storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Create storage policies for uploads bucket
CREATE POLICY "Anyone can view uploaded files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own uploads" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);