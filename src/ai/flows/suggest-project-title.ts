'use server';

/**
 * @fileOverview A flow for suggesting creative title rewrites for projects using AI.
 *
 * - suggestProjectTitle - A function that suggests title rewrites for a project.
 * - SuggestProjectTitleInput - The input type for the suggestProjectTitle function.
 * - SuggestProjectTitleOutput - The return type for the suggestProjectTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectTitleInputSchema = z.object({
  currentTitle: z
    .string()
    .describe('The current title of the project that needs a rewrite.'),
  description: z.string().describe('The description of the project.'),
});
export type SuggestProjectTitleInput = z.infer<typeof SuggestProjectTitleInputSchema>;

const SuggestProjectTitleOutputSchema = z.object({
  rewrittenTitle: z
    .string()
    .describe('The AI-suggested creative title rewrite for the project.'),
});
export type SuggestProjectTitleOutput = z.infer<typeof SuggestProjectTitleOutputSchema>;

export async function suggestProjectTitle(input: SuggestProjectTitleInput): Promise<SuggestProjectTitleOutput> {
  return suggestProjectTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectTitlePrompt',
  input: {schema: SuggestProjectTitleInputSchema},
  output: {schema: SuggestProjectTitleOutputSchema},
  prompt: `You are an expert copywriter specializing in creating engaging and SEO-friendly titles.

  Based on the current project title and description, suggest a creative title rewrite that improves appeal and SEO.
  Consider using more keywords if relevant, but also aim to create a click-worthy title. Be creative!

  Current Title: {{{currentTitle}}}
  Description: {{{description}}}
  `,
});

const suggestProjectTitleFlow = ai.defineFlow(
  {
    name: 'suggestProjectTitleFlow',
    inputSchema: SuggestProjectTitleInputSchema,
    outputSchema: SuggestProjectTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
