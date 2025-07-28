import { Button } from "@/components/ui/button";
import { Shield, Bot, Search } from "lucide-react";
import heroImage from "@/assets/truthbot-hero.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 text-primary">
              <Shield className="w-8 h-8" />
              <span className="text-lg font-semibold">TruthBot AI Guardian</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Verify News
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Instantly</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Combat misinformation with our AI-powered fact-checking system. 
              Submit any news article or URL and get instant authenticity analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onGetStarted}
                className="group"
              >
                <Bot className="w-5 h-5 group-hover:animate-pulse" />
                Start Fact-Checking
              </Button>
              <Button variant="outline" size="xl">
                <Search className="w-5 h-5" />
                Learn More
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">AI-Powered</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium">Reliable</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6 text-success" />
                </div>
                <p className="text-sm font-medium">Instant</p>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="TruthBot AI Guardian protecting against fake news"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-glow animate-pulse-glow">
              <Shield className="w-12 h-12 text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};