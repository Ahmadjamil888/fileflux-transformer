
import React from "react";
import Header from "@/components/Header";
import FileConverter from "@/components/FileConverter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-background to-background/70">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgOGgydi0yaC0ydjJ6bTItNHYtMmgtMnYyaDJ6bS02IDRoMnYtMmgtMnYyem0yLTR2LTJoLTJ2MmgyelwiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <Header />
      
      <main className="flex-1 container py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Any File Format
          </h2>
          <p className="text-xl text-muted-foreground">
            Select your file, choose output format, and convert instantly.
          </p>
        </section>
        
        <FileConverter />
        
        <section className="mt-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Easy File Upload</h3>
              <p className="text-muted-foreground">
                Drag and drop your files or browse to select them from your device.
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m9 10 3 3 3-3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Multiple Formats</h3>
              <p className="text-muted-foreground">
                Convert between various document, image, audio, and data formats.
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15V3m0 12 4-4m-4 4-4-4" />
                  <path d="M2 17a5 5 0 0 0 10 0c0-2.76-4.48-5-5-10-.52 5-5 7.24-5 10Z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Conversion</h3>
              <p className="text-muted-foreground">
                Quick and reliable conversion with instant download of your transformed files.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
