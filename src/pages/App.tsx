import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Send,
  Download,
  Sparkles,
  Code,
  Eye,
  Loader2,
  Triangle,
  Square,
  Pentagon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [siteData, setSiteData] = useState({ id: null, previewUrl: null });
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of website you'd like to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL }/api/generate`,
      {
        prompt,
      }
    );

    setSiteData(res.data);

    setIsGenerating(false);
    toast({
      title: "Website generated!",
      description: "Your website has been created successfully.",
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_API_URL}/api/download/${siteData?.id}`;
    link.setAttribute("download", "generated-site.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-md bg-gray-900/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeAtik Agent
            </span>
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="border-gray-600 bg-gray-300/20 hover:border-purple-400 text-white transition"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>

            <Button
              onClick={handleDownload}
              disabled={!siteData?.id}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition"
            >
              <Download className="w-4 h-4 mr-2" />
              Download ZIP
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-10rem)]">
          {/* Input Panel */}
          <section className="w-full lg:w-1/3 space-y-6">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg h-full flex flex-col">
              <h2 className="text-2xl font-bold flex items-center space-x-2 mb-4">
                <Code className="w-6 h-6 text-purple-400" />
                <span>Describe Your Website</span>
              </h2>

              <Textarea
                placeholder={`Describe the website you want to create... 

Examples:
• A modern restaurant website with a dark theme
• A personal portfolio for a designer
• A business landing page for a tech startup
• A blog site with a clean layout`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] bg-gray-800/60 border-gray-600 text-white placeholder-gray-400 resize-none rounded-md flex-1"
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6 font-semibold transition"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Website...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Website
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* Preview Panel */}
          {showPreview && (
            <section className="w-full lg:w-2/3">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg h-full flex flex-col">
                <h2 className="text-2xl font-bold flex items-center space-x-2 mb-4">
                  <Eye className="w-6 h-6 text-purple-400" />
                  <span>Live Preview</span>
                </h2>

                <div className="bg-gradient-to-tr from-indigo-500 to-purple-800 rounded-lg overflow-hidden flex-1">
                  {isGenerating ? (
                    <div className="h-full flex flex-col justify-center items-center text-white text-xl font-semibold gap-2">
                      <div className="flex flex-col items-center gap-2">
                        <Triangle className="animate-spin text-violet-300" />
                        <div className="flex gap-2">
                          <Square className="animate-spin text-violet-100" />
                          <Pentagon className="animate-spin text-violet-400" />
                        </div>
                      </div>
                      <div>Generating Website ...</div>
                    </div>
                  ) : siteData?.previewUrl ? (
                    <iframe
                      src={siteData.previewUrl}
                      className="w-full h-full min-h-[300px] border-0"
                      title="Website Preview"
                    />
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center text-white text-xl font-semibold">
                      <div className="flex flex-col items-center gap-2  ">
                        <Triangle />
                        <div className="flex gap-2">
                          <Square /> <Pentagon />
                        </div>
                      </div>
                      <div>Please generate a site to preview it here.</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
