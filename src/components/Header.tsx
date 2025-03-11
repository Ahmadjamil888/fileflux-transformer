
import React from "react";
import { FileJson } from "lucide-react";

const Header = () => {
  return (
    <header className="py-6">
      <div className="container flex justify-center items-center">
        <div className="flex items-center">
          <div className="mr-3 bg-primary/10 p-2 rounded-lg">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">FileFlux</h1>
            <p className="text-sm text-muted-foreground">Universal File Transformer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
