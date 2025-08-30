import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Students() {
  const [document, setDocument] = useState("");
  const [context, setContext] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [enhancedDoc, setEnhancedDoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Auto-import text from .txt, .md, .json files
    if (file.type === "text/plain" || file.name.endsWith(".md") || file.name.endsWith(".json")) {
      const text = await file.text();
      setDocument(text);
    }
  };

  const handleEnhance = () => {
    if (!document || !context) return;

    setIsLoading(true);
    setTimeout(() => {
      // Mock enhancement - in reality this would call an AI service
      const enhanced = `Enhanced version of ${uploadedFile ? `"${uploadedFile.name}"` : "your document"}:
      
${document}

Applied enhancements based on context: "${context}"

This is a mock enhancement. The real service would use AI to improve the document.`;
      
      setEnhancedDoc(enhanced);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Document Enhancement</h1>
        <p className="text-lg text-muted-foreground">
          Improve your academic papers and essays with AI assistance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Document</CardTitle>
            <CardDescription>
              Paste your text or upload a document to enhance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste your document text here..."
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.md,.json,application/pdf,.doc,.docx"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              {uploadedFile && (
                <p className="text-sm text-muted-foreground">
                  File: {uploadedFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhancement Context</CardTitle>
            <CardDescription>
              Describe how you want to improve the document
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="context">Goal/Context</Label>
              <Textarea
                id="context"
                placeholder="e.g., Make it more academic, improve citations..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleEnhance}
              disabled={!document || !context || isLoading}
            >
              {isLoading ? "Enhancing..." : "Enhance Document"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {enhancedDoc && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Enhanced Document</CardTitle>
            <CardDescription>
              Here is your enhanced document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans">{enhancedDoc}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
