// src/ai/flows/resume-tailor.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for tailoring a resume to a specific job posting.
 *
 * It takes a job posting URL as input and provides suggestions on how to rephrase the resume
 * to better align with the desired qualifications.
 *
 * @exports {resumeTailor} - The main function to trigger the resume tailoring flow.
 * @exports {ResumeTailorInput} - The input type for the resumeTailor function.
 * @exports {ResumeTailorOutput} - The output type for the resumeTailor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeTailorInputSchema = z.object({
  jobPostingUrl: z.string().describe('The URL of the job posting.'),
  resumeText: z.string().describe('The text of the resume to tailor.'),
});
export type ResumeTailorInput = z.infer<typeof ResumeTailorInputSchema>;

const ResumeTailorOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions on how to rephrase the resume to better align with the job posting.'),
});
export type ResumeTailorOutput = z.infer<typeof ResumeTailorOutputSchema>;

export async function resumeTailor(input: ResumeTailorInput): Promise<ResumeTailorOutput> {
  return resumeTailorFlow(input);
}

const resumeTailorPrompt = ai.definePrompt({
  name: 'resumeTailorPrompt',
  input: {schema: ResumeTailorInputSchema},
  output: {schema: ResumeTailorOutputSchema},
  prompt: `You are an expert resume tailor. Given a job posting URL and the text of a resume,
you will provide suggestions on how to rephrase the resume to better align with the desired
qualifications in the job posting.

Job Posting URL: {{{jobPostingUrl}}}
Resume Text: {{{resumeText}}}

Suggestions:`, // Ensure clear instructions for the LLM
});

const resumeTailorFlow = ai.defineFlow(
  {
    name: 'resumeTailorFlow',
    inputSchema: ResumeTailorInputSchema,
    outputSchema: ResumeTailorOutputSchema,
  },
  async input => {
    const {output} = await resumeTailorPrompt(input);
    return output!;
  }
);
