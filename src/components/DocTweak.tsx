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
  const [sideBySide, setSideBySide] = useState(false);

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

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      alert('Tweaked text copied to clipboard');
    }).catch((e) => {
      console.error('Clipboard error', e);
      alert('Failed to copy to clipboard');
    });
  }

  function downloadResult(filename = 'tweaked-document.txt') {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tweaked Document</h3>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">Side-by-side</label>
              <input type="checkbox" checked={sideBySide} onChange={() => setSideBySide(!sideBySide)} />
            </div>
          </div>

          {sideBySide ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <h4 className="font-semibold mb-1">Original</h4>
                <pre className="whitespace-pre-wrap bg-muted p-3 rounded h-64 overflow-auto">{inputText}</pre>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Tweaked</h4>
                <pre className="whitespace-pre-wrap bg-muted p-3 rounded h-64 overflow-auto">{result}</pre>
              </div>
            </div>
          ) : (
            <div>
              <pre className="whitespace-pre-wrap bg-muted p-4 rounded mt-2">{result}</pre>
            </div>
          )}

          <div className="flex items-center space-x-2 mt-3">
            <Button onClick={copyResult} size="sm">Copy</Button>
            <Button onClick={() => downloadResult()} size="sm">Download .txt</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocTweak;
 