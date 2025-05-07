
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Info, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  fileName?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ fileName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hi there! I'm ready to answer questions about ${fileName || 'your document'} once it's processed. How can I help you today?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    // Simulated AI responses based on uploaded document
    // In a real implementation, this would call an API to get responses based on the document content
    const responses = [
      "Based on the document you uploaded, the answer is...",
      "According to the information in your document, I'd say that...",
      "The document doesn't specifically address this question, but related content suggests...",
      "From analyzing your document, I found that...",
      "Interesting question! The document mentions that...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
      " This is a simulated response - in the full version, responses would be based on actual document content analysis.";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-insight-light flex items-center justify-center">
            <MessageSquare size={18} className="text-insight-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Document Chat</h2>
            {fileName && <p className="text-xs text-muted-foreground">Discussing: {fileName}</p>}
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <Info size={18} />
        </Button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-insight-light bg-opacity-40">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "mb-4 max-w-[80%] animate-in fade-in-50",
              message.isUser ? "ml-auto" : "mr-auto"
            )}
          >
            <div className={cn(
              "p-3 rounded-2xl",
              message.isUser 
                ? "chat-bubble-user" 
                : "chat-bubble-ai"
            )}>
              <p className="text-sm">{message.content}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 px-1">
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 max-w-[80%] mr-auto">
            <div className="chat-bubble-ai">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your document..."
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={!input.trim()}
          className="bg-insight-primary hover:bg-insight-secondary"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
