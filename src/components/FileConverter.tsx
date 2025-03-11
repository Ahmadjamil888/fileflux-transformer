
import React, { useState, useRef } from "react";
import { ArrowDownUp, ArrowRight, File, Upload, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import FormatSelector from "./FormatSelector";
import DropZone from "./DropZone";
import ConversionProgress from "./ConversionProgress";

export type FileFormat = {
  extension: string;
  name: string;
  icon?: React.ReactNode;
  category: "image" | "document" | "data" | "audio" | "video" | "other";
};

export const FILE_FORMATS: FileFormat[] = [
  { extension: "pdf", name: "PDF Document", category: "document" },
  { extension: "png", name: "PNG Image", category: "image" },
  { extension: "jpg", name: "JPEG Image", category: "image" },
  { extension: "svg", name: "SVG Image", category: "image" },
  { extension: "gif", name: "GIF Image", category: "image" },
  { extension: "docx", name: "Word Document", category: "document" },
  { extension: "xlsx", name: "Excel Spreadsheet", category: "document" },
  { extension: "pptx", name: "PowerPoint", category: "document" },
  { extension: "txt", name: "Text File", category: "document" },
  { extension: "json", name: "JSON File", category: "data" },
  { extension: "csv", name: "CSV File", category: "data" },
  { extension: "xml", name: "XML File", category: "data" },
  { extension: "html", name: "HTML File", category: "data" },
  { extension: "mp3", name: "MP3 Audio", category: "audio" },
  { extension: "wav", name: "WAV Audio", category: "audio" },
  { extension: "mp4", name: "MP4 Video", category: "video" },
  { extension: "zip", name: "ZIP Archive", category: "other" },
];

const FileConverter = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [inputFormat, setInputFormat] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string | null>(null);
  const [conversionState, setConversionState] = useState<"idle" | "converting" | "completed" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setInputFile(file);
    // Auto-detect format from file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension) {
      setInputFormat(extension);
    }
  };

  const handleConvert = () => {
    if (!inputFile || !outputFormat) {
      toast.error("Please select both input file and output format");
      return;
    }

    // Simulate conversion process
    setConversionState("converting");
    setProgress(0);
    
    const simulateProgress = () => {
      setProgress((prev) => {
        if (prev < 90) {
          const increment = Math.random() * 15 + 5;
          const newProgress = Math.min(prev + increment, 90);
          setTimeout(simulateProgress, Math.random() * 500 + 200);
          return newProgress;
        }
        return prev;
      });
    };

    setTimeout(simulateProgress, 500);

    // Simulate conversion completion
    setTimeout(() => {
      // In a real app, we would actually convert the file here
      setProgress(100);
      setConversionState("completed");
      
      // Create a fake blob URL for demonstration
      const dummyContent = new Blob(["Converted file content would be here"], { type: "application/octet-stream" });
      const url = URL.createObjectURL(dummyContent);
      setConvertedFileUrl(url);
      
      toast.success("File successfully converted!");
    }, 3000);
  };

  const handleSwapFormats = () => {
    if (inputFormat && outputFormat) {
      setInputFormat(outputFormat);
      setOutputFormat(inputFormat);
    }
  };

  const handleDownload = () => {
    if (convertedFileUrl && inputFile && outputFormat) {
      const link = document.createElement("a");
      link.href = convertedFileUrl;
      
      // Change the extension in the original filename
      const originalName = inputFile.name.split('.').slice(0, -1).join('.');
      link.download = `${originalName}.${outputFormat}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Download started!");
    }
  };

  const resetConversion = () => {
    setInputFile(null);
    setConversionState("idle");
    setProgress(0);
    setConvertedFileUrl(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-none shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          {conversionState === "idle" && (
            <>
              <div className="space-y-6">
                <DropZone onFileSelected={handleFileUpload} file={inputFile} />
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                  <div className="md:col-span-3">
                    <FormatSelector 
                      value={inputFormat} 
                      onChange={setInputFormat} 
                      label="Source Format"
                      disabled={!inputFile}
                    />
                  </div>
                  
                  <div className="flex justify-center md:col-span-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSwapFormats}
                      disabled={!inputFormat || !outputFormat}
                      className="rounded-full"
                    >
                      <ArrowDownUp className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="md:col-span-3">
                    <FormatSelector 
                      value={outputFormat} 
                      onChange={setOutputFormat} 
                      label="Target Format"
                      disabled={!inputFile || !inputFormat}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={handleConvert}
                    disabled={!inputFile || !inputFormat || !outputFormat}
                    className="px-8 py-6 text-lg rounded-full font-semibold"
                  >
                    Convert Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {(conversionState === "converting" || conversionState === "completed") && (
            <ConversionProgress
              state={conversionState}
              progress={progress}
              fileName={inputFile?.name || ""}
              inputFormat={inputFormat || ""}
              outputFormat={outputFormat || ""}
              onDownload={handleDownload}
              onReset={resetConversion}
            />
          )}
          
          {conversionState === "error" && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
              <h3 className="text-2xl font-bold mb-2">Conversion Failed</h3>
              <p className="text-muted-foreground mb-6">
                Something went wrong while converting your file. Please try again.
              </p>
              <Button onClick={resetConversion} variant="outline">
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileConverter;
