'use server';

/**
 * @fileOverview An AI agent for improving project features.
 *
 * - improveProjectFeatures - A function that handles the project feature improvement process.
 * - ImproveProjectFeaturesInput - The input type for the improveProjectFeatures function.
 * - ImproveProjectFeaturesOutput - The return type for the improveProjectFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveProjectFeaturesInputSchema = z.object({
  features: z
    .string()
    .describe('The current list of features for the project.'),
  description: z.string().describe('A description of the project.'),
});
export type ImproveProjectFeaturesInput = z.infer<
  typeof ImproveProjectFeaturesInputSchema
>;

const ImproveProjectFeaturesOutputSchema = z.object({
  improvedFeatures: z
    .string()
    .describe('The AI-suggested improvements to the project features.'),
});
export type ImproveProjectFeaturesOutput = z.infer<
  typeof ImproveProjectFeaturesOutputSchema
>;

export async function improveProjectFeatures(
  input: ImproveProjectFeaturesInput
): Promise<ImproveProjectFeaturesOutput> {
  return improveProjectFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveProjectFeaturesPrompt',
  input: {schema: ImproveProjectFeaturesInputSchema},
  output: {schema: ImproveProjectFeaturesOutputSchema},
  prompt: `You are an expert project manager specializing in brainstorming new features for software projects.

You will use the project description and the current list of features to suggest new and improved features.

Project Description: {{{description}}}
Current Features: {{{features}}}

Suggest some improvements and additions to the feature list. Focus on features that would add value to the user and make the project more competitive.`,
});

const improveProjectFeaturesFlow = ai.defineFlow(
  {
    name: 'improveProjectFeaturesFlow',
    inputSchema: ImproveProjectFeaturesInputSchema,
    outputSchema: ImproveProjectFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
