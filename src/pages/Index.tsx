import React, { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ChatInterface from "@/components/ChatInterface";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Search, FileUp } from "lucide-react";
import { uploadFile } from "@/lib/api";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [keyTopics, setKeyTopics] = useState<string>("");
  const [documentStructure, setDocumentStructure] = useState<
    Array<{ struct: string; value: string }>
  >([]);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      setIsProcessed(true);
      setSummary(response.summary.content);
      setKeyTopics(response.key_topics.content);
      console.log(JSON.parse(response.document_structure.content));
      setDocumentStructure(JSON.parse(response.document_structure.content));
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        {!isProcessed ? (
          <>
            {/* Hero Section */}
            <section className="py-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6 w-16 h-16 mx-auto bg-gradient-to-br from-insight-primary to-insight-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">I</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                  <span className="gradient-text">InsightAI</span> Document
                  Intelligence
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Upload your documents and get instant AI-powered answers and
                  insights
                </p>

                <div className="animate-pulse-slow">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>

                {isProcessing && (
                  <div className="mt-8">
                    <p className="text-muted-foreground">
                      Processing {uploadedFile?.name}...
                    </p>
                    <div className="mt-4 mx-auto w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-insight-primary animate-pulse rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Features Section */}
            <section className="py-12">
              <h2 className="text-2xl font-display font-semibold text-center mb-8">
                Unlock the Power of Your Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  title="Upload Any Document"
                  description="Support for PDFs, TXT files, Word documents, and more. Easy drag & drop interface."
                  icon={FileUp}
                />
                <FeatureCard
                  title="Intelligent Analysis"
                  description="Our AI quickly processes your documents to extract key information and insights."
                  icon={Search}
                />
                <FeatureCard
                  title="Conversational Interface"
                  description="Ask questions in plain English and get precise answers based on your documents."
                  icon={MessageSquare}
                />
              </div>
            </section>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col">
              <div className="bg-card rounded-lg p-4 shadow-sm mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Upload size={18} className="text-insight-primary" />
                    <h3 className="font-semibold">Uploaded Document</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetUpload}>
                    Upload Another
                  </Button>
                </div>

                <div className="flex items-center p-3 bg-muted rounded-md">
                  <div className="w-10 h-12 bg-white rounded flex items-center justify-center border">
                    <FileUp size={20} className="text-insight-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{uploadedFile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile?.size &&
                        (uploadedFile.size / 1024 / 1024).toFixed(2)) ||
                        0}{" "}
                      MB • {uploadedFile?.type || "document"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Your document has been processed. Ask questions about it in
                    the chat.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 shadow-sm flex-1">
                <h3 className="font-semibold mb-3">Document Insights</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Key Topics</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keyTopics.split(",").map((topic) => (
                        <span className="px-2 py-1 bg-insight-light text-insight-primary text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Document Structure</h4>
                    <div className="text-xs text-muted-foreground mt-2">
                      {documentStructure.map((structure) => (
                        <p>
                          {structure?.struct}: {structure?.value}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Summary</h4>
                    <p className="text-xs text-muted-foreground mt-2">
                      {summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow overflow-hidden border h-[600px]">
              <ChatInterface fileName={uploadedFile?.name} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
