import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useEffect, useState } from "react";
import { fetchSites } from "@/features/sites/siteSlice";
import { Download, Folder, MoreVertical, ExternalLink } from "lucide-react";
import Loading from "@/components/admin-panel/Loading";

const Sites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { sites, loading, error } = useSelector(
    (state: RootState) => state.sites
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (token) dispatch(fetchSites(token));
  }, [dispatch, token]);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDownload = (folderId: string) => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_API_URL}/api/download/${folderId}`;
    link.setAttribute("download", "generated-site.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Total Generated Sites
          </h1>
          <p className="text-gray-400">
            Manage and preview generated websites
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : sites?.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <Folder className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">
              No projects yet
            </h3>
            <p className="mt-2 text-gray-500">
              Generate your first website to see it appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div
                key={site._id}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-xl border border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white truncate">
                        {site.name || `Project ${site.folderId}`}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        ID: {site.folderId}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(site._id)}
                        className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {activeDropdown === site._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-10 border border-slate-700">
                          <button
                            onClick={() => handleDownload(site.folderId)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-slate-700/50"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/preview/${
                        site.folderId
                      }/index.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-purple-500 rounded-lg text-sm font-medium text-purple-300 hover:bg-purple-900/30 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                    <button
                      onClick={() => handleDownload(site.folderId)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-slate-800/30 px-5 py-3 text-xs text-gray-500 border-t border-slate-700/50">
                  Created:{" "}
                  {new Date(site.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sites;
