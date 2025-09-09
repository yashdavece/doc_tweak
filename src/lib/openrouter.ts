import { OpenRouter } from '@openrouter/api';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export interface DocumentTweakRequest {
  content: string;
  style?: 'professional' | 'academic' | 'casual';
  tone?: 'formal' | 'friendly' | 'confident';
}

export async function tweakDocument({ content, style = 'professional', tone = 'formal' }: DocumentTweakRequest) {
  try {
    const response = await openrouter.chat({
      model: 'openrouter/auto', // OpenRouter will select the best model for the task
      messages: [
        {
          role: 'system',
          content: `You are a professional document editor. Enhance the following text to be more ${style} in style and ${tone} in tone while maintaining the original meaning.`
        },
        {
          role: 'user',
          content
        }
      ]
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error tweaking document:', error);
    throw new Error('Failed to process document');
  }
}

export default openrouter;
