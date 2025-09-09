import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, style = 'professional', tone = 'formal' } = req.body || {};

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Missing text in request body' });
    return;
  }

  try {
    const systemPrompt = `You are a professional document editor. Enhance the user's document to be more ${style} in style and ${tone} in tone while preserving the original meaning. Keep the structure but improve clarity, grammar, and flow. Return only the revised document text.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'anthropic/claude-2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        max_tokens: 1600,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error', data);
      res.status(502).json({ error: 'OpenRouter API error', details: data });
      return;
    }

    const tweaked = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';

    res.status(200).json({ success: true, tweaked });
  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ error: 'Server error' });
  }
}
