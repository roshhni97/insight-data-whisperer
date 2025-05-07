
import React from "react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 bg-gradient-to-br from-insight-primary to-insight-secondary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">I</span>
            </div>
            <p className="text-sm font-display font-semibold">InsightAI</p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InsightAI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/yourusername/insightai" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
