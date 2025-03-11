
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, CheckCircle2 } from "lucide-react";

interface ConversionProgressProps {
  state: "converting" | "completed" | "error";
  progress: number;
  fileName: string;
  inputFormat: string;
  outputFormat: string;
  onDownload: () => void;
  onReset: () => void;
}

const ConversionProgress: React.FC<ConversionProgressProps> = ({
  state,
  progress,
  fileName,
  inputFormat,
  outputFormat,
  onDownload,
  onReset,
}) => {
  const baseFileName = fileName.split(".").slice(0, -1).join(".");
  const outputFileName = `${baseFileName}.${outputFormat}`;

  return (
    <div className="flex flex-col items-center text-center p-4">
      {state === "converting" ? (
        <>
          <div className="animate-pulse-opacity mb-4">
            <RefreshCw className="h-16 w-16 text-primary animate-spin" />
          </div>
          <h3 className="text-xl font-bold mb-2">Converting your file...</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We're transforming {fileName} from {inputFormat.toUpperCase()} to{" "}
            {outputFormat.toUpperCase()}. This might take a moment.
          </p>
          <div className="w-full max-w-md mb-2">
            <Progress value={progress} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </>
      ) : (
        <>
          <div className="mb-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Conversion Complete!</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Your file has been successfully converted from {inputFormat.toUpperCase()} to{" "}
            {outputFormat.toUpperCase()} and is ready for download.
          </p>
          <div className="bg-muted/30 rounded-lg p-4 w-full max-w-md mb-6">
            <p className="font-medium">{outputFileName}</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={onDownload} className="px-6">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={onReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Convert Another File
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversionProgress;
