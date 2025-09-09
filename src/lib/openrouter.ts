export interface DocumentTweakRequest {
  content: string;
  style?: 'professional' | 'academic' | 'casual';
  tone?: 'formal' | 'friendly' | 'confident';
}

export async function tweakDocument({ content, style = 'professional', tone = 'formal' }: DocumentTweakRequest) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://doctweak.vercel.app', // Replace with your actual domain
        'X-Title': 'DocTweak'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-2', // Using Claude for high-quality text enhancement
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
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error tweaking document:', error);
    throw new Error('Failed to process document');
  }
}

export default openrouter;
