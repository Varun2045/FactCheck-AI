import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={() => setShowChat(true)} />
      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Index;