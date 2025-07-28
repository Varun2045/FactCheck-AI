import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Shield, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  analysis?: {
    isAuthentic: boolean;
    confidence: number;
    reasoning: string;
    sources?: string[];
  };
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

export const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm TruthBot, your AI-powered fact-checker. Send me a news article, URL, or claim and I'll analyze its authenticity for you.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeNews = async (content: string): Promise<Message['analysis']> => {
    // Simulate AI analysis - in real implementation, this would call an AI service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple mock analysis based on keywords
    const suspiciousKeywords = ['shocking', 'unbelievable', 'miracle cure', 'secret government', 'they don\'t want you to know'];
    const reliableKeywords = ['according to', 'study shows', 'research indicates', 'expert says', 'official statement'];
    
    const hasSuspicious = suspiciousKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    const hasReliable = reliableKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    
    let isAuthentic = true;
    let confidence = 75;
    let reasoning = "Analysis based on content patterns and language indicators.";
    
    if (hasSuspicious && !hasReliable) {
      isAuthentic = false;
      confidence = 85;
      reasoning = "Contains sensationalized language patterns commonly found in misinformation. Lacks credible source citations.";
    } else if (hasReliable) {
      confidence = 90;
      reasoning = "Contains credible language patterns and appears to reference authoritative sources.";
    }
    
    // Add some randomization for demo
    confidence += Math.floor(Math.random() * 20) - 10;
    confidence = Math.max(60, Math.min(95, confidence));
    
    return {
      isAuthentic,
      confidence,
      reasoning,
      sources: isAuthentic ? ['Reuters', 'AP News', 'BBC'] : ['Fact-check pending']
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isAnalyzing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);

    try {
      const analysis = await analyzeNews(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I've analyzed your submission. Here's my assessment:`,
        analysis,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Analysis Complete",
        description: `Content appears to be ${analysis.isAuthentic ? 'authentic' : 'potentially misleading'}`,
        variant: analysis.isAuthentic ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col shadow-elegant">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">TruthBot AI</h2>
              <p className="text-sm text-muted-foreground">Fact-checking assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[70%] space-y-2 ${message.type === 'user' ? 'order-first' : ''}`}>
                <Card className={`p-4 ${message.type === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-card'}`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </Card>

                {message.analysis && (
                  <Card className="p-4 space-y-4 border-l-4 border-l-primary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {message.analysis.isAuthentic ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                        )}
                        <Badge variant={message.analysis.isAuthentic ? "default" : "destructive"}>
                          {message.analysis.isAuthentic ? "Likely Authentic" : "Potentially Misleading"}
                        </Badge>
                      </div>
                      <span className={`text-sm font-medium ${getConfidenceColor(message.analysis.confidence)}`}>
                        {message.analysis.confidence}% Confidence
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Analysis
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {message.analysis.reasoning}
                      </p>
                    </div>

                    {message.analysis.sources && message.analysis.sources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Referenced Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {message.analysis.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground animate-pulse" />
              </div>
              <Card className="p-4 bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Analyzing content...</span>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste a news article, URL, or claim to fact-check..."
              className="flex-1"
              disabled={isAnalyzing}
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isAnalyzing}
              variant="hero"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Support for text, URLs, and claims
          </p>
        </div>
      </Card>
    </div>
  );
};