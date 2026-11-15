import { useState, useMemo, useEffect } from "react";
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
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  PlusCircle,
  MessageSquare,
  Compass,
  Palette,
  Layers,
  Cpu,
  Share2,
  Play,
  RotateCcw,
  FileCode,
  Globe,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { CURATED_TEMPLATES, convertHtmlToJsx } from "@/lib/studioHelpers";
import { CodeEditorWithGutter } from "@/components/studio/CodeEditorWithGutter";

type ViewportMode = "desktop" | "tablet" | "mobile";
type StudioTab = "preview" | "code" | "blueprint";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

interface SiteBlueprint {
  title?: string;
  category?: string;
  description?: string;
  targetAudience?: string;
  brandTone?: string;
  colorPalette?: {
    primary?: string;
    secondary?: string;
    background?: string;
    surface?: string;
    text?: string;
    accent?: string;
  };
  typography?: {
    fontFamily?: string;
    headingFont?: string;
  };
  sections?: Array<{ name: string; summary: string }>;
  interactiveWidgets?: string[];
}

interface GeneratedSite {
  id: string | null;
  title?: string;
  blueprint?: SiteBlueprint;
  previewUrl: string | null;
  files?: Record<string, string>;
  createdAt?: string;
  revision?: number;
}

interface AIModelOption {
  id: string;
  name: string;
  badge: string;
  provider?: string;
}

const DEFAULT_ALLOWED_MODELS: AIModelOption[] = [
  { id: "baidu/ernie-5.5-flash-preview:free", name: "ERNIE 5.5 Flash", badge: "Fast & Free", provider: "Baidu" },
  { id: "inclusionai/ling-3.2-flash:free", name: "Ling 3.2 Flash", badge: "Free", provider: "InclusionAI" },
  { id: "thinkingmachines/inkling-2-small:free", name: "Inkling 2 Small", badge: "Lightweight", provider: "ThinkingMachines" },
  { id: "particle-ai/particle-1:free", name: "Particle 1", badge: "Agentic", provider: "Particle" },
  { id: "nvidia/nemotron-3.5-super-vl:free", name: "Nemotron 3.5 Super VL", badge: "Vision / Logic", provider: "NVIDIA" },
];

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [refinePrompt, setRefinePrompt] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModelOption[]>(DEFAULT_ALLOWED_MODELS);
  const [selectedModel, setSelectedModel] = useState<string>("baidu/ernie-5.5-flash-preview:free");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [activeTab, setActiveTab] = useState<StudioTab>("preview");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [selectedCodeFile, setSelectedCodeFile] = useState<string>("index.html");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Real SSE streaming progress tracking
  const [generationStage, setGenerationStage] = useState<string>("");
  const [generationStep, setGenerationStep] = useState<{ current: number; total: number }>({ current: 0, total: 3 });
  const [liveBlueprint, setLiveBlueprint] = useState<SiteBlueprint | null>(null);

  // Editable code state for in-studio manual overrides
  const [editableCode, setEditableCode] = useState<Record<string, string>>({});
  const [originalAiFiles, setOriginalAiFiles] = useState<Record<string, string>>({});

  const [siteData, setSiteData] = useState<GeneratedSite>({
    id: null,
    previewUrl: null,
    files: undefined,
  });

  const { toast } = useToast();
  const { token } = useSelector((state: RootState) => state.auth);

  // Dynamically synchronize allowed OpenRouter models with backend whitelist
  useEffect(() => {
    const fetchAllowedModels = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/models`);
        if (res.data?.models && Array.isArray(res.data.models) && res.data.models.length > 0) {
          setAvailableModels(res.data.models);
          if (res.data.defaultModel) {
            setSelectedModel(res.data.defaultModel);
          }
        }
      } catch {
        // Fallback gracefully to DEFAULT_ALLOWED_MODELS
      }
    };
    fetchAllowedModels();
  }, []);

  // Construct iframe srcDoc for instant 0ms preview rendering without network roundtrips
  const iframeSrcDoc = useMemo(() => {
    const activeFiles = siteData?.files;
    if (!activeFiles || !activeFiles["index.html"]) {
      return null;
    }

    let html = activeFiles["index.html"];
    const css = activeFiles["styles.css"] || "";
    const js = activeFiles["script.js"] || "";

    // Inject styles.css inline if not already embedded
    if (css.trim()) {
      html = html.replace(
        "</head>",
        `<style>\n${css}\n</style>\n</head>`
      );
    }

    // Inject script.js inline if not already embedded
    if (js.trim()) {
      html = html.replace(
        "</body>",
        `<script>\n${js}\n</script>\n</body>`
      );
    }

    return html;
  }, [siteData]);

  // Derived React JSX code
  const convertedJsxCode = useMemo(() => {
    return convertHtmlToJsx(editableCode["index.html"] || siteData?.files?.["index.html"] || "");
  }, [editableCode, siteData]);

  // Handle agentic site generation using real Server-Sent Events (SSE) Stream
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
    setGenerationStage("Initiating Agentic Pipeline...");
    setGenerationStep({ current: 1, total: 3 });
    setLiveBlueprint(null);

    try {
      // Connect to real SSE Stream Endpoint
      const response = await fetch(`${API_BASE_URL}/api/generate/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: prompt.trim(), model: selectedModel }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No readable stream received from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const block of lines) {
          if (!block.trim()) continue;

          let eventName = "message";
          let eventData = "";

          for (const line of block.split("\n")) {
            if (line.startsWith("event:")) {
              eventName = line.replace("event:", "").trim();
            } else if (line.startsWith("data:")) {
              eventData = line.replace("data:", "").trim();
            }
          }

          if (!eventData) continue;

          try {
            const parsed = JSON.parse(eventData);

            if (eventName === "stage") {
              setGenerationStage(parsed.message || "Running agent step...");
              if (parsed.step && parsed.totalSteps) {
                setGenerationStep({ current: parsed.step, total: parsed.totalSteps });
              }
            } else if (eventName === "blueprint") {
              setLiveBlueprint(parsed);
              setGenerationStage(`Architect formulated blueprint: "${parsed.title || "Ready"}"`);
            } else if (eventName === "complete") {
              const generatedFiles = parsed.files || {};
              setSiteData({
                id: parsed.id,
                title: parsed.title || "Generated Website",
                blueprint: parsed.blueprint,
                previewUrl: parsed.previewUrl,
                files: generatedFiles,
                createdAt: parsed.createdAt,
              });

              setEditableCode({ ...generatedFiles });
              setOriginalAiFiles({ ...generatedFiles });

              toast({
                title: "Agentic Generation Complete! 🚀",
                description: `Website & code synthesized successfully: ${parsed.title}`,
              });
            } else if (eventName === "error") {
              throw new Error(parsed.error || "Generation error from server");
            }
          } catch (e) {
            const err = e as Error;
            console.warn("Error processing stream event:", err.message);
          }
        }
      }
    } catch (streamError) {
      const err = streamError as Error;
      console.warn("SSE stream interrupted or failed, attempting standard API fallback:", err.message);
      setGenerationStage("Finalizing via direct agent fallback...");

      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/generate`,
          { prompt: prompt.trim(), model: selectedModel },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const generatedFiles = res.data.files || {};
        setSiteData({
          id: res.data.id,
          title: res.data.title || "Generated Website",
          blueprint: res.data.blueprint,
          previewUrl: res.data.previewUrl,
          files: generatedFiles,
          createdAt: res.data.createdAt,
        });

        setEditableCode({ ...generatedFiles });
        setOriginalAiFiles({ ...generatedFiles });

        toast({
          title: "Website Created Successfully! 🚀",
          description: `Website created: ${res.data.title}`,
        });
      } catch (fallbackError) {
        const axiosErr = fallbackError as { response?: { data?: { error?: string } }; message?: string };
        toast({
          title: "Generation Failed",
          description: axiosErr.response?.data?.error || axiosErr.message || "Failed to generate website",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
      setGenerationStage("");
    }
  };

  // Handle iterative refinement
  const handleRefine = async () => {
    if (!refinePrompt.trim() || !siteData?.id) {
      toast({
        title: "Refinement prompt needed",
        description: "Please specify what you want to change or add.",
        variant: "destructive",
      });
      return;
    }

    setIsRefining(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/refine`,
        {
          projectId: siteData.id,
          prompt: refinePrompt.trim(),
          model: selectedModel,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedFiles = res.data.files || {};
      setSiteData((prev) => ({
        ...prev,
        title: res.data.title || prev.title,
        blueprint: res.data.blueprint || prev.blueprint,
        files: updatedFiles,
        revision: res.data.revision,
      }));

      setEditableCode({ ...updatedFiles });
      setOriginalAiFiles({ ...updatedFiles });
      setRefinePrompt("");

      toast({
        title: `Revision #${res.data.revision || 2} Ready! ✨`,
        description: "Your changes have been incorporated.",
      });
    } catch (error) {
      const axiosErr = error as { response?: { data?: { error?: string } }; message?: string };
      console.error("Refinement error:", axiosErr);
      toast({
        title: "Refinement Failed",
        description: axiosErr.response?.data?.error || axiosErr.message || "Failed to refine website",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  // Handle manual code edits in studio with instant hot-reload
  const handleApplyCodeEdit = () => {
    if (!siteData?.id) return;
    setSiteData((prev) => ({
      ...prev,
      files: { ...editableCode },
    }));
    toast({
      title: "Hot Reload Applied! ⚡",
      description: "Preview updated with your manual code changes.",
    });
  };

  // Reset code to original AI output
  const handleResetCode = () => {
    setEditableCode({ ...originalAiFiles });
    setSiteData((prev) => ({
      ...prev,
      files: { ...originalAiFiles },
    }));
    toast({
      title: "Reset to Original AI Code",
      description: "Manual changes have been reverted.",
    });
  };

  // Handle in-memory ZIP download
  const handleDownload = () => {
    if (!siteData?.id) return;
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/api/download/${siteData.id}`;
    link.setAttribute("download", `${(siteData.title || "generated-site").toLowerCase().replace(/\s+/g, "-")}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle public share link
  const handleShareLink = () => {
    if (!siteData?.id) return;
    const publicUrl = `${window.location.origin}/p/${siteData.id}`;
    navigator.clipboard.writeText(publicUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
    toast({
      title: "Public Link Copied! 🔗",
      description: "Anyone can now view your live generated website at this link.",
    });
  };

  // Handle code copy
  const handleCopyCode = (content: string, label: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard!",
      description: `${label} copied successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
              <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-1.5 rounded-lg shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeAtik Agent
              </span>
            </Link>

            {siteData?.title && (
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-purple-300 border border-slate-700">
                {siteData.title}
                {siteData.revision && ` (Rev ${siteData.revision})`}
              </span>
            )}
          </div>

          {/* Center: Device Viewport Switcher & Tab Switcher */}
          {siteData?.id && (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center px-3 py-1 text-xs font-medium rounded-md transition ${
                    activeTab === "preview"
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center px-3 py-1 text-xs font-medium rounded-md transition ${
                    activeTab === "code"
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code className="w-3.5 h-3.5 mr-1.5" />
                  Code Editor
                </button>
                <button
                  onClick={() => setActiveTab("blueprint")}
                  className={`flex items-center px-3 py-1 text-xs font-medium rounded-md transition ${
                    activeTab === "blueprint"
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 mr-1.5" />
                  Blueprint & SEO
                </button>
              </div>

              {activeTab === "preview" && (
                <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewport("desktop")}
                    title="Desktop View"
                    className={`p-1.5 rounded-md transition ${
                      viewport === "desktop"
                        ? "bg-slate-800 text-purple-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewport("tablet")}
                    title="Tablet View (768px)"
                    className={`p-1.5 rounded-md transition ${
                      viewport === "tablet"
                        ? "bg-slate-800 text-purple-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewport("mobile")}
                    title="Mobile View (375px)"
                    className={`p-1.5 rounded-md transition ${
                      viewport === "mobile"
                        ? "bg-slate-800 text-purple-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {siteData?.id && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareLink}
                  className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs h-8"
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 mr-1" />
                      Share
                    </>
                  )}
                </Button>

                <Link
                  to={`/p/${siteData.id}`}
                  target="_blank"
                  className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition h-8"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Live Fullscreen
                </Link>
              </>
            )}

            <Button
              onClick={handleDownload}
              disabled={!siteData?.id || isGenerating || isRefining}
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-lg transition h-8"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download ZIP
            </Button>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Left Column: AI Web Harness Controls */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Primary Generation Card */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>Agentic Web Builder</span>
                </h2>

                {siteData?.id && (
                  <button
                    onClick={() => {
                      setSiteData({ id: null, previewUrl: null, files: undefined });
                      setPrompt("");
                      setEditableCode({});
                      setOriginalAiFiles({});
                      setLiveBlueprint(null);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    New Project
                  </button>
                )}
              </div>

              {!siteData?.id ? (
                <>
                  <p className="text-xs text-slate-400 mb-3">
                    Describe your website idea. The harness will deploy an <strong>Architect Agent</strong> to formulate a UX blueprint, a <strong>Lead Engineer</strong> to synthesize code, and a <strong>QA Agent</strong> to polish the result.
                  </p>

                  {/* OpenRouter Model Selector */}
                  <div className="flex items-center justify-between mb-2.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      <span>Model:</span>
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={isGenerating}
                      className="bg-slate-900 border border-slate-700/80 text-purple-300 text-xs rounded-md px-2.5 py-1 outline-none focus:border-purple-500 font-mono cursor-pointer"
                    >
                      {availableModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.badge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <Textarea
                    placeholder="e.g. A high-converting SaaS landing page for an AI video editor with glassmorphism, bento grid features, pricing tiers, and an interactive FAQ..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                    className="min-h-[160px] bg-slate-950/80 border-slate-700/80 text-slate-100 placeholder-slate-500 resize-none rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                  />

                  {/* Curated Prompt Quick Start Templates */}
                  <div className="mt-3">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      ⚡ Quick Start with Curated Templates:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CURATED_TEMPLATES.slice(0, 4).map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => setPrompt(tpl.prompt)}
                          className="text-left p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-[11px] text-slate-300 transition group"
                        >
                          <span className="block font-medium text-purple-300 group-hover:text-purple-200 truncate">
                            {tpl.icon} {tpl.title}
                          </span>
                          <span className="text-slate-500 text-[10px] block truncate">{tpl.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 transition shadow-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running Agentic Pipeline...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Build with AI Agents
                      </>
                    )}
                  </Button>
                </>
              ) : (
                /* Iterative Refinement Chat Mode */
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Current Site:</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{siteData.title}</p>
                    {siteData.blueprint?.category && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 text-[10px]">
                        {siteData.blueprint.category}
                      </span>
                    )}
                  </div>

                  {/* Model Selector for Refinement */}
                  <div className="flex items-center justify-between mb-2 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      <span>Model:</span>
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={isRefining}
                      className="bg-slate-900 border border-slate-700/80 text-purple-300 text-xs rounded-md px-2 py-1 outline-none focus:border-purple-500 font-mono cursor-pointer"
                    >
                      {availableModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.badge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                      Refine with Agentic Feedback:
                    </label>
                    <Textarea
                      placeholder="e.g. Change primary accent color to emerald green, add a pricing table with 3 tiers, make navbar sticky on scroll..."
                      value={refinePrompt}
                      onChange={(e) => setRefinePrompt(e.target.value)}
                      disabled={isRefining}
                      className="min-h-[120px] bg-slate-950/80 border-slate-700/80 text-slate-100 placeholder-slate-500 resize-none rounded-lg text-sm"
                    />

                    <Button
                      onClick={handleRefine}
                      disabled={isRefining || !refinePrompt.trim()}
                      className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-2 transition"
                    >
                      {isRefining ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          Refining Site...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 mr-2" />
                          Apply Refinement
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Link
                to="/dashboard"
                className="text-center mt-4 text-xs text-slate-400 hover:text-purple-400 transition"
              >
                View all generated projects in Dashboard →
              </Link>
            </div>
          </div>

          {/* Right Column: Live Studio / Code Inspector Canvas */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden min-h-[550px]">
              {/* If Generating - Real Multi-Stage Progress */}
              {isGenerating || isRefining ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950/60">
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                    <Sparkles className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">
                    {isRefining ? "Refining Website with AI Agents..." : "CodeAtik Agentic Pipeline Active"}
                  </h3>

                  {/* Real-Time Live Server Message */}
                  <div className="max-w-md w-full bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 shadow-xl text-left space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs text-purple-300 font-mono">
                      <span>Step {generationStep.current} of {generationStep.total}</span>
                      <span className="text-[11px] text-slate-400 font-sans">Real-Time SSE Stream</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-500"
                        style={{ width: `${(generationStep.current / generationStep.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed pt-1">
                      {generationStage || "Synthesizing website architecture..."}
                    </p>
                  </div>

                  {/* Preview live blueprint as soon as Stage 1 finishes */}
                  {liveBlueprint && (
                    <div className="max-w-md w-full p-3 bg-purple-950/30 border border-purple-800/50 rounded-lg text-left text-xs animate-fade-in">
                      <span className="text-purple-300 font-semibold block text-[11px]">
                        ✓ Architect Formulated Blueprint:
                      </span>
                      <p className="text-slate-200 font-medium">{liveBlueprint.title}</p>
                      {liveBlueprint.colorPalette && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {Object.values(liveBlueprint.colorPalette).map((color, i) => (
                            <span
                              key={i}
                              className="w-4 h-4 rounded-full border border-slate-700 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : !siteData?.id ? (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-950/30">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mb-4">
                    <Compass className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-200 mb-1">
                    Agentic Studio Canvas
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Select a quick start template or enter a prompt on the left. The AI Agents will analyze your requirements, construct a custom design system blueprint, and synthesize production code.
                  </p>
                </div>
              ) : activeTab === "preview" ? (
                /* Live Preview Canvas */
                <div className="flex-1 bg-slate-950/70 p-4 flex items-center justify-center overflow-auto">
                  <div
                    className={`transition-all duration-300 h-full flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden ${
                      viewport === "desktop"
                        ? "w-full"
                        : viewport === "tablet"
                        ? "w-[768px] border-4 border-slate-700 rounded-xl"
                        : "w-[375px] border-8 border-slate-800 rounded-2xl"
                    }`}
                  >
                    <iframe
                      srcDoc={iframeSrcDoc || undefined}
                      src={!iframeSrcDoc && siteData.previewUrl ? siteData.previewUrl : undefined}
                      className="w-full flex-1 border-0 min-h-[480px]"
                      title="Website Preview"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </div>
              ) : activeTab === "blueprint" ? (
                /* Architect Blueprint & SEO Inspector */
                <div className="flex-1 p-6 overflow-auto bg-slate-950 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-purple-400" />
                      Architectural Blueprint & SEO
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Strategic design and metadata formulated by the Chief UX/UI Architect Agent.
                    </p>
                  </div>

                  {/* Google Search Result Preview */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      Google Search Result Preview
                    </span>
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <Globe className="w-3.5 h-3.5 text-purple-400" />
                        <span>https://codeatik.app/p/{siteData.id}</span>
                      </div>
                      <h4 className="text-base font-medium text-blue-400 hover:underline cursor-pointer">
                        {siteData.title || "Generated Website"}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {siteData.blueprint?.description || "Explore this modern responsive web application created with CodeAtik Agentic Harness."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Brand & Audience */}
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block">
                        Category & Audience
                      </span>
                      <p className="text-sm font-medium text-slate-200">
                        {siteData.blueprint?.category || "General Website"}
                      </p>
                      <p className="text-xs text-slate-400">
                        <strong>Target:</strong> {siteData.blueprint?.targetAudience || "General public"}
                      </p>
                      <p className="text-xs text-slate-400">
                        <strong>Brand Tone:</strong> {siteData.blueprint?.brandTone || "Modern & Professional"}
                      </p>
                    </div>

                    {/* Color Palette */}
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        Color Harmony
                      </span>
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {siteData.blueprint?.colorPalette &&
                          Object.entries(siteData.blueprint.colorPalette).map(([name, hex]) => (
                            <div key={name} className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                              <span
                                className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0"
                                style={{ backgroundColor: hex }}
                              />
                              <div className="overflow-hidden">
                                <span className="text-[10px] text-slate-400 capitalize block truncate">{name}</span>
                                <span className="text-[10px] font-mono text-slate-300">{hex}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Sections Outline */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Planned Sections & Features
                    </span>
                    <div className="space-y-2">
                      {siteData.blueprint?.sections?.map((sec, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs">
                          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-[11px] font-semibold">
                            {sec.name}
                          </span>
                          <span className="text-slate-300 flex-1">{sec.summary}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Widgets */}
                  {siteData.blueprint?.interactiveWidgets && (
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block">
                        Interactive Widgets
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {siteData.blueprint.interactiveWidgets.map((w, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                            ✓ {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Code Editor with Line Numbers & JSX Canvas */
                <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
                  {/* Code File Tabs & Controls */}
                  <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-slate-900/60 flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      {["index.html", "styles.css", "script.js"].map((fileName) => (
                        <button
                          key={fileName}
                          onClick={() => setSelectedCodeFile(fileName)}
                          className={`px-3 py-1 text-xs font-mono rounded-md transition ${
                            selectedCodeFile === fileName
                              ? "bg-purple-950 text-purple-300 border border-purple-800"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {fileName}
                        </button>
                      ))}

                      {/* React JSX Export Tab */}
                      <button
                        onClick={() => setSelectedCodeFile("React JSX")}
                        className={`flex items-center gap-1 px-3 py-1 text-xs font-mono rounded-md transition ${
                          selectedCodeFile === "React JSX"
                            ? "bg-indigo-950 text-indigo-300 border border-indigo-800"
                            : "text-indigo-400 hover:text-indigo-200"
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        React JSX
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedCodeFile !== "React JSX" && (
                        <>
                          <Button
                            size="sm"
                            onClick={handleApplyCodeEdit}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-7 px-2.5 flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            Apply Changes
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleResetCode}
                            title="Reset to AI code"
                            className="text-slate-400 hover:text-white text-xs h-7 px-2"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        </>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopyCode(
                            selectedCodeFile === "React JSX"
                              ? convertedJsxCode
                              : editableCode[selectedCodeFile] || "",
                            selectedCodeFile
                          )
                        }
                        className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs h-7"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            Copy {selectedCodeFile}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Code Editor Area with Line Numbers Gutter */}
                  <div className="flex-1 p-2 flex flex-col overflow-hidden bg-slate-950">
                    {selectedCodeFile === "React JSX" ? (
                      <div className="flex-1 p-3 overflow-auto font-mono text-xs text-indigo-200 leading-relaxed select-text bg-slate-950 rounded-lg border border-slate-900">
                        <pre className="whitespace-pre-wrap">{convertedJsxCode}</pre>
                      </div>
                    ) : (
                      <CodeEditorWithGutter
                        value={editableCode[selectedCodeFile] || ""}
                        onChange={(newVal) =>
                          setEditableCode((prev) => ({
                            ...prev,
                            [selectedCodeFile]: newVal,
                          }))
                        }
                        onApply={handleApplyCodeEdit}
                        language={selectedCodeFile.split(".").pop()}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
