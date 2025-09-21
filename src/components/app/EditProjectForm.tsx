'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Project } from '@/lib/projects';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Sparkles, LoaderCircle, PartyPopper } from 'lucide-react';
import { suggestProjectTitle } from '@/ai/flows/suggest-project-title';
import { suggestProjectDescription } from '@/ai/flows/suggest-project-description';
import { improveProjectFeatures } from '@/ai/flows/improve-project-features';
import { useToast } from '@/hooks/use-toast';
import { GeneratePostDialog } from './GeneratePostDialog';
import { useRouter } from 'next/navigation';

export default function EditProjectForm({ project }: { project: Project }) {
  const [imageUrl, setImageUrl] = useState(project.imageUrl);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [features, setFeatures] = useState(project.features);
  const [linkUrl, setLinkUrl] = useState(project.demoLink);
  const [price, setPrice] = useState(project.price);

  const [isTitleLoading, setIsTitleLoading] = useState(false);
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const [isFeaturesLoading, setIsFeaturesLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [isGeneratePostOpen, setIsGeneratePostOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSuggestTitle = async () => {
    setIsTitleLoading(true);
    try {
      const result = await suggestProjectTitle({ currentTitle: title, description });
      setTitle(result.rewrittenTitle);
      toast({ title: 'Title suggestion applied!' });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not suggest a new title.',
      });
    } finally {
      setIsTitleLoading(false);
    }
  };

  const handleSuggestDescription = async () => {
    setIsDescriptionLoading(true);
    try {
      const result = await suggestProjectDescription({ currentDescription: description });
      setDescription(result.suggestedDescription);
      toast({ title: 'Description suggestion applied!' });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not suggest a new description.',
      });
    } finally {
      setIsDescriptionLoading(false);
    }
  };

  const handleImproveFeatures = async () => {
    setIsFeaturesLoading(true);
    try {
      const result = await improveProjectFeatures({ features, description });
      setFeatures(result.improvedFeatures);
      toast({ title: 'Feature improvements applied!' });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not improve features.',
      });
    } finally {
      setIsFeaturesLoading(false);
    }
  };
  
  const handleUpdateProject = () => {
    setIsUpdating(true);
    // In a real app, you would make an API call here.
    // For this demo, we'll just simulate a delay.
    setTimeout(() => {
      console.log('Updated Project Data:', { title, description, features, imageUrl, linkUrl, price });
      toast({
        title: 'Project Updated!',
        description: 'Your changes have been saved successfully.',
      });
      setIsUpdating(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Project Image</CardTitle>
          <CardDescription>Update your project's hero image. Use a remote URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-[3/2] relative w-full max-w-md mx-auto rounded-lg overflow-hidden border">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Edit your project's information. Use the AI tools for suggestions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div className="flex gap-2">
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Button onClick={handleSuggestTitle} disabled={isTitleLoading} variant="outline">
                {isTitleLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                Suggest
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="flex items-start gap-2">
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
              <Button onClick={handleSuggestDescription} disabled={isDescriptionLoading} variant="outline" className="mt-px">
                {isDescriptionLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                Suggest
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
             <div className="flex items-start gap-2">
              <Textarea id="features" value={features} onChange={(e) => setFeatures(e.target.value)} rows={5} placeholder="One feature per line" />
              <Button onClick={handleImproveFeatures} disabled={isFeaturesLoading} variant="outline" className="mt-px">
                {isFeaturesLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                Improve
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input id="linkUrl" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} />
            </div>
          </div>

        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setIsGeneratePostOpen(true)}>
                <PartyPopper /> Generate Social Media Post
            </Button>
            <Button onClick={handleUpdateProject} disabled={isUpdating} className="flex-grow sm:flex-grow-0">
                {isUpdating ? <LoaderCircle className="animate-spin" /> : null}
                Update Project
            </Button>
        </CardContent>
      </Card>

      <GeneratePostDialog
        isOpen={isGeneratePostOpen}
        setIsOpen={setIsGeneratePostOpen}
        project={{...project, title, description, features, demoLink: linkUrl}}
      />
    </div>
  );
}
