
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is PDF or other supported document types
    if (file.type === "application/pdf" || 
        file.type === "text/plain" || 
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} has been selected for processing.`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, TXT, or DOCX file.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      toast({
        title: "Success!",
        description: `${selectedFile.name} has been uploaded for processing.`,
      });
    }
  };

  return (
    <Card className={`border-2 ${dragActive ? 'border-insight-primary border-dashed' : 'border-border'} transition-all duration-200`}>
      <CardContent className="p-6">
        <div 
          className="flex flex-col items-center justify-center gap-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="h-20 w-20 rounded-full bg-insight-light flex items-center justify-center">
            <Upload size={36} className="text-insight-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-display font-semibold text-lg">Upload your document</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Drag and drop your PDF, TXT, or DOCX file here, or click to browse
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <div className="relative flex-1">
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.txt,.docx"
              />
              <Button variant="outline" className="w-full">
                Browse files
              </Button>
            </div>
            
            <Button 
              className="flex-1 bg-insight-primary hover:bg-insight-secondary"
              disabled={!selectedFile}
              onClick={handleUpload}
            >
              Process Document
            </Button>
          </div>
          
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Selected:</span> 
              <span className="text-muted-foreground">{selectedFile.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
