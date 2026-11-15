import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Sparkles, Download, Share2, Check, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SiteProjectData {
  _id: string;
  title: string;
  activeFiles?: Array<{ name: string; content: string }>;
  blueprint?: {
    category?: string;
    description?: string;
  };
}

const PublicSiteViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<SiteProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/project/${id}`);
        setSite(res.data);
        if (res.data.title) {
          document.title = `${res.data.title} | Built with CodeAtik`;
        }
      } catch (err: any) {
        console.error("Failed to load public project:", err);
        setError("Website not found or may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link Copied!",
      description: "Public link copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    if (!id) return;
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_API_URL}/api/download/${id}`;
    link.setAttribute("download", `${(site?.title || "website").toLowerCase().replace(/\s+/g, "-")}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400 mb-3" />
        <p className="text-sm text-slate-400">Loading website preview...</p>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-purple-400">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-400 max-w-sm mb-6">{error || "This website could not be found."}</p>
        <Link to="/app">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm">
            Generate Your Own Website
          </Button>
        </Link>
      </div>
    );
  }

  const previewUrl = `${import.meta.env.VITE_API_URL}/preview/${id}/index.html`;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {/* Fullscreen Embedded Website */}
      <iframe
        src={previewUrl}
        className="w-full h-full border-0"
        title={site.title || "Website Preview"}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />

      {/* Unobtrusive Floating CodeAtik Badge & Actions (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-full px-3.5 py-2 shadow-2xl text-xs text-slate-200">
        <Link to="/app" className="flex items-center gap-1.5 font-medium hover:text-purple-300 transition">
          <div className="bg-purple-600 p-1 rounded-full">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span>Built with <strong>CodeAtik</strong></span>
        </Link>

        <span className="text-slate-600">|</span>

        <button
          onClick={handleShare}
          title="Share link"
          className="flex items-center gap-1 text-slate-400 hover:text-white transition px-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Share"}</span>
        </button>

        <span className="text-slate-600">|</span>

        <button
          onClick={handleDownload}
          title="Download ZIP"
          className="flex items-center gap-1 text-slate-400 hover:text-white transition px-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ZIP</span>
        </button>

        <Link
          to="/app"
          className="ml-1 bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1 rounded-full font-medium flex items-center gap-0.5 text-[11px] transition"
        >
          <span>Remix</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default PublicSiteViewer;
