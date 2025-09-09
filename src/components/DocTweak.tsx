import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

async function extractTextFromPdf(file: File) {
  // Use PDF.js via dynamic import to avoid bundling it for users who don't upload PDFs
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    text += '\n\n' + pageText;
  }
  return text;
}

const DocTweak: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      setLoading(true);
      try {
        const text = await extractTextFromPdf(file);
        setInputText(text);
      } catch (err) {
        console.error('PDF parse error', err);
        alert('Failed to parse PDF');
      } finally {
        setLoading(false);
      }
    } else {
      const text = await file.text();
      setInputText(text);
    }
  }

  async function handleTweak() {
    setLoading(true);
    setResult('');
    try {
      const resp = await fetch('/api/tweak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, style: 'professional', tone: 'formal' }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'API error');
      setResult(data.tweaked);
    } catch (err: any) {
      console.error(err);
      alert('Failed to tweak document: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground">Paste text or upload a file</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={10}
          className="w-full p-3 rounded-md border"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input type="file" accept=".pdf,.txt,.md,.docx" onChange={handleFile} />
        <Button onClick={handleTweak} disabled={!inputText || loading}>
          {loading ? 'Processing...' : 'Tweak Document'}
        </Button>
      </div>

      {result && (
        <div>
          <h3 className="text-lg font-semibold">Tweaked Document</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded mt-2">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default DocTweak;
