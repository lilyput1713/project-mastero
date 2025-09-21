// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview AI-powered project description enhancement.
 *
 * @fileOverview Provides a Genkit flow to suggest enhanced project descriptions using AI, incorporating industry best practices.
 *   - suggestProjectDescription - The function to trigger the project description suggestion flow.
 *   - SuggestProjectDescriptionInput - Input type for the suggestProjectDescription function.
 *   - SuggestProjectDescriptionOutput - Output type for the suggestProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectDescriptionInputSchema = z.object({
  currentDescription: z
    .string()
    .describe('The current description of the project.'),
});
export type SuggestProjectDescriptionInput = z.infer<
  typeof SuggestProjectDescriptionInputSchema
>;

const SuggestProjectDescriptionOutputSchema = z.object({
  suggestedDescription: z
    .string()
    .describe('The AI-suggested enhanced description for the project.'),
});
export type SuggestProjectDescriptionOutput = z.infer<
  typeof SuggestProjectDescriptionOutputSchema
>;

export async function suggestProjectDescription(
  input: SuggestProjectDescriptionInput
): Promise<SuggestProjectDescriptionOutput> {
  return suggestProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectDescriptionPrompt',
  input: {schema: SuggestProjectDescriptionInputSchema},
  output: {schema: SuggestProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant specializing in writing engaging and effective project descriptions.

  Given the current project description, your task is to rewrite and enhance it to maximize reader engagement and highlight key features and benefits.
  Incorporate industry best practices for SEO and persuasive writing. Focus on making the description clear, concise, and appealing to potential users or investors.

Current Project Description: {{{currentDescription}}}

Suggest an enhanced project description:`,
});

const suggestProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestProjectDescriptionFlow',
    inputSchema: SuggestProjectDescriptionInputSchema,
    outputSchema: SuggestProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
