import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Upload, 
  Wand2, 
  Download, 
  Building2, 
  Presentation, 
  FileCheck,
  TrendingUp,
  Users,
  Target
} from "lucide-react";

const Business = () => {
  const [document, setDocument] = useState("");
  const [context, setContext] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tweakedDocument, setTweakedDocument] = useState("");

  const handleTweak = async () => {
    if (!document.trim() || !context.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response
    setTweakedDocument(`ENHANCED BUSINESS DOCUMENT

${document}

[AI Enhancement Applied: Professional tone optimized for ${context}. Enhanced clarity, structure, and persuasive language while maintaining technical accuracy.]`);
    
    setIsProcessing(false);
  };

  const businessUseCases = [
    {
      icon: Presentation,
      title: "Business Proposals",
      description: "Transform your proposals into compelling, professional documents that win clients."
    },
    {
      icon: FileCheck,
      title: "Contracts & Agreements",
      description: "Ensure your legal documents are clear, comprehensive, and professionally written."
    },
    {
      icon: TrendingUp,
      title: "Reports & Analytics",
      description: "Present your data and insights in a clear, executive-ready format."
    },
    {
      icon: Users,
      title: "Team Communications",
      description: "Improve internal memos, announcements, and policy documents."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-business-muted text-business-accent text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            For Business Professionals
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Professional Documents
            <span className="block text-business-primary">Made Perfect</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business communications with AI-powered document enhancement. 
            From proposals to contracts, make every word count.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="business" size="lg" className="font-semibold">
              <Wand2 className="w-5 h-5 mr-2" />
              Start Enhancing
            </Button>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect for Business Needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessUseCases.map((useCase, index) => (
              <Card key={index} className="hover-lift border-business-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 gradient-business rounded-lg flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Document Tweak Tool */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-business">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Business Document Enhancer</CardTitle>
              <CardDescription>
                Upload your document and specify the business context for AI-powered enhancement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="document" className="text-base font-medium">
                  Your Document
                </Label>
                <Textarea
                  id="document"
                  placeholder="Paste your business document here... (proposals, contracts, reports, etc.)"
                  className="min-h-[200px] mt-2"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="context" className="text-base font-medium">
                  Business Context
                </Label>
                <Textarea
                  id="context"
                  placeholder="e.g., 'Proposal for a Fortune 500 tech company looking for cybersecurity solutions'"
                  className="min-h-[100px] mt-2"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleTweak}
                disabled={!document.trim() || !context.trim() || isProcessing}
                className="w-full" 
                variant="business"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enhancing Document...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Enhance My Business Document
                  </>
                )}
              </Button>

              {tweakedDocument && (
                <div className="border-t pt-6">
                  <Label className="text-base font-medium">Enhanced Document</Label>
                  <div className="mt-2 p-4 bg-business-muted rounded-lg border border-business-primary/20">
                    <pre className="whitespace-pre-wrap text-sm text-foreground">
                      {tweakedDocument}
                    </pre>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(tweakedDocument)}
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Business;