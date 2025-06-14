
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Download, Sparkles, Code, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    
    // Simulate AI generation with a more realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a sample website based on the prompt
    const sampleCode = generateSampleCode(prompt);
    setGeneratedCode(sampleCode);
    
    // Update iframe content
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(sampleCode);
        doc.close();
      }
    }
    
    setIsGenerating(false);
    toast({
      title: "Website generated!",
      description: "Your website has been created successfully.",
    });
  };

  const generateSampleCode = (userPrompt: string) => {
    const lowerPrompt = userPrompt.toLowerCase();
    let theme = 'blue';
    let content = 'Welcome to Your Website';
    let description = 'This is a beautiful website created with AI';
    
    if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
      theme = 'orange';
      content = 'Delicious Dining Experience';
      description = 'Experience the finest cuisine in town with our expertly crafted dishes';
    } else if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('personal')) {
      theme = 'purple';
      content = 'My Portfolio';
      description = 'Showcasing my work and passion for creating amazing experiences';
    } else if (lowerPrompt.includes('business') || lowerPrompt.includes('company')) {
      theme = 'green';
      content = 'Your Business Success';
      description = 'Driving innovation and excellence in everything we do';
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        .gradient-${theme} {
            background: linear-gradient(135deg, 
                ${theme === 'blue' ? '#3b82f6, #1d4ed8' : ''}
                ${theme === 'orange' ? '#f97316, #ea580c' : ''}
                ${theme === 'purple' ? '#8b5cf6, #7c3aed' : ''}
                ${theme === 'green' ? '#10b981, #059669' : ''}
            );
        }
    </style>
</head>
<body class="min-h-screen bg-gray-50">
    <header class="gradient-${theme} text-white">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold">Brand</h1>
                <div class="hidden md:flex space-x-6">
                    <a href="#" class="hover:text-gray-200">Home</a>
                    <a href="#" class="hover:text-gray-200">About</a>
                    <a href="#" class="hover:text-gray-200">Services</a>
                    <a href="#" class="hover:text-gray-200">Contact</a>
                </div>
            </div>
        </nav>
        
        <div class="container mx-auto px-6 py-20 text-center">
            <h2 class="text-5xl font-bold mb-6 fade-in">${content}</h2>
            <p class="text-xl mb-8 fade-in opacity-90">${description}</p>
            <button class="bg-white text-${theme}-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors fade-in">
                Get Started
            </button>
        </div>
    </header>

    <main class="container mx-auto px-6 py-16">
        <section class="text-center mb-16">
            <h3 class="text-3xl font-bold mb-8 text-gray-800">Our Features</h3>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-6 bg-white rounded-lg shadow-lg fade-in">
                    <div class="w-12 h-12 bg-${theme}-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6 text-${theme}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Fast & Reliable</h4>
                    <p class="text-gray-600">Lightning-fast performance you can count on</p>
                </div>
                
                <div class="p-6 bg-white rounded-lg shadow-lg fade-in">
                    <div class="w-12 h-12 bg-${theme}-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6 text-${theme}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Secure</h4>
                    <p class="text-gray-600">Your data is safe and protected with us</p>
                </div>
                
                <div class="p-6 bg-white rounded-lg shadow-lg fade-in">
                    <div class="w-12 h-12 bg-${theme}-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6 text-${theme}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">User-Friendly</h4>
                    <p class="text-gray-600">Designed with your experience in mind</p>
                </div>
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2024 AI Generated Website. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach((el, index) => {
                el.style.animationDelay = (index * 0.1) + 's';
            });
        });
    </script>
</body>
</html>`;
  };

  const handleDownload = () => {
    if (!generatedCode) {
      toast({
        title: "No website to download",
        description: "Please generate a website first.",
        variant: "destructive",
      });
      return;
    }

    // Create a ZIP file simulation (in a real app, you'd use a library like JSZip)
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-generated-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started!",
      description: "Your website has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeCraft AI
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="border-gray-600 hover:border-purple-400 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              
              <Button
                onClick={handleDownload}
                disabled={!generatedCode}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Download ZIP
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Code className="w-6 h-6 text-purple-400" />
                <span>Describe Your Website</span>
              </h2>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe the website you want to create... 
                  
For example:
• Create a modern restaurant website with a dark theme
• Build a personal portfolio site for a designer
• Make a business landing page for a tech startup
• Design a blog website with a clean layout"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[200px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                />
                
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
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
            </div>

            {/* Generated Code Display */}
            {generatedCode && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Generated Code</h3>
                <div className="bg-gray-900/80 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {generatedCode.substring(0, 500)}...
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Eye className="w-6 h-6 text-purple-400" />
                <span>Live Preview</span>
              </h2>
              
              <div className="bg-white rounded-lg overflow-hidden h-full">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Website Preview"
                  sandbox="allow-scripts"
                  srcDoc={generatedCode || `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                      <div style="text-align: center;">
                        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Welcome to CodeCraft AI</h1>
                        <p style="font-size: 1.1rem; opacity: 0.9;">Enter a prompt to generate your website</p>
                      </div>
                    </div>
                  `}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
