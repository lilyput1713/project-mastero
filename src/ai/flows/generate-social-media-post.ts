// src/ai/flows/generate-social-media-post.ts
'use server';
/**
 * @fileOverview Generates an SEO-friendly social media post based on project details.
 *
 * - generateSocialMediaPost - A function to generate a social media post.
 * - GenerateSocialMediaPostInput - The input type for the generateSocialMediaPost function.
 * - GenerateSocialMediaPostOutput - The return type for the generateSocialMediaPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaPostInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('The description of the project.'),
  features: z.string().describe('The features of the project.'),
  linkUrl: z.string().describe('The link URL of the project.'),
});
export type GenerateSocialMediaPostInput = z.infer<
  typeof GenerateSocialMediaPostInputSchema
>;

const GenerateSocialMediaPostOutputSchema = z.object({
  post: z.string().describe('The generated social media post.'),
});
export type GenerateSocialMediaPostOutput = z.infer<
  typeof GenerateSocialMediaPostOutputSchema
>;

export async function generateSocialMediaPost(
  input: GenerateSocialMediaPostInput
): Promise<GenerateSocialMediaPostOutput> {
  return generateSocialMediaPostFlow(input);
}

const generateSocialMediaPostPrompt = ai.definePrompt({
  name: 'generateSocialMediaPostPrompt',
  input: {schema: GenerateSocialMediaPostInputSchema},
  output: {schema: GenerateSocialMediaPostOutputSchema},
  prompt: `You are an expert social media marketer specializing in creating SEO-friendly posts.

  Generate a social media post to promote the following project. Make it engaging and encourage people to click the link.
  Incorporate relevant keywords to improve visibility.

  Title: {{{title}}}
  Description: {{{description}}}
  Features: {{{features}}}
  Link URL: {{{linkUrl}}}
  `,
});

const generateSocialMediaPostFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaPostFlow',
    inputSchema: GenerateSocialMediaPostInputSchema,
    outputSchema: GenerateSocialMediaPostOutputSchema,
  },
  async input => {
    const {output} = await generateSocialMediaPostPrompt(input);
    return output!;
  }
);
