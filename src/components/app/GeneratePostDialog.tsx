'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Copy, Check } from 'lucide-react';
import { generateSocialMediaPost } from '@/ai/flows/generate-social-media-post';
import { type Project } from '@/lib/projects';
import { useToast } from '@/hooks/use-toast';

type GeneratePostDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: Project;
};

export function GeneratePostDialog({
  isOpen,
  setIsOpen,
  project,
}: GeneratePostDialogProps) {
  const [post, setPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const generatePost = async () => {
        setIsLoading(true);
        setPost('');
        try {
          const result = await generateSocialMediaPost({
            title: project.title,
            description: project.description,
            features: project.features,
            linkUrl: project.demoLink,
          });
          setPost(result.post);
        } catch (error) {
          console.error(error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not generate social media post.',
          });
          setIsOpen(false);
        } finally {
          setIsLoading(false);
        }
      };
      generatePost();
    }
  }, [isOpen, project, toast, setIsOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Social Media Post</DialogTitle>
          <DialogDescription>
            Here's an SEO-friendly post for your project. Copy it and share it with the world!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Textarea value={post} readOnly rows={8} />
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleCopy} disabled={isLoading || !post}>
            {hasCopied ? <Check /> : <Copy />}
            {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
