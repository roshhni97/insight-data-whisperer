import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-gradient-to-br from-insight-primary to-insight-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h1 className="text-xl font-display font-bold">InsightAI</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              window.open(
                "https://github.com/roshhni97/insight-data-whisperer",
                "_blank"
              )
            }
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
