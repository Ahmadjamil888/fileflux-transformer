
import React, { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  file: File | null;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelected, file }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    if (fileList.length > 1) {
      toast.error("Please select only one file");
      return;
    }
    
    const selectedFile = fileList[0];
    onFileSelected(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    onFileSelected(null as unknown as File);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      {!file ? (
        <div
          className={`drop-zone rounded-lg p-8 text-center cursor-pointer flex flex-col items-center justify-center min-h-[200px] ${
            isDragging ? "active" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Drag & Drop your file here
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            or click to browse your files
          </p>
          <Button variant="outline" type="button">
            Select File
          </Button>
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-6 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full" 
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <File className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-sm truncate" title={file.name}>
                {file.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
