import React, { useState, useRef } from 'react';
import { ArrowLeft, RefreshCw, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import { VDOSKyLogo } from './VDOSKyLogo';

interface WebViewSectionProps {
  onClose: () => void;
  url?: string;
  title?: string;
}

export const WebViewSection: React.FC<WebViewSectionProps> = ({
  onClose,
  url = 'https://sayantikapatra.blogspot.com',
  title = 'Sayantika Patra'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    if (typeof (window as any).openCustomTab === 'function') {
      (window as any).openCustomTab(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14] flex flex-col w-full h-[100dvh] overflow-hidden select-none animate-fadeIn">
      {/* Top Header Bar */}
      <header className="bg-[#0f141f] border-b border-gray-800 px-3 py-2.5 sm:px-6 flex items-center justify-between gap-3 shrink-0 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            id="btn-webview-back"
            onClick={onClose}
            className="flex items-center gap-1.5 bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border border-gray-700 active:scale-95 shadow"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Globe className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white leading-tight flex items-center gap-1.5 truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                <span>{title}</span>
                <span className="hidden sm:inline-flex items-center text-[10px] text-emerald-400 font-mono font-normal bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Secure
                </span>
              </h1>
              <p className="text-[10px] text-gray-400 font-mono truncate max-w-[150px] sm:max-w-xs">
                {url}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="btn-webview-reload"
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all cursor-pointer border border-gray-700 active:scale-95"
            title="Reload Page"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <button
            id="btn-webview-external"
            onClick={handleOpenExternal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
            title="Open in Browser"
          >
            <span>Browser</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main WebView Container */}
      <div className="relative flex-1 w-full h-full bg-[#0d121c] overflow-hidden">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d121c]/90 backdrop-blur-sm pointer-events-none">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <Globe className="w-5 h-5 text-emerald-400 absolute inset-0 m-auto" />
            </div>
            <p className="text-xs font-bold text-gray-200">Loading Web Page...</p>
            <p className="text-[11px] text-gray-400 mt-1 font-mono">{url}</p>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          key={key}
          ref={iframeRef}
          src={url}
          title={title}
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer-when-downgrade"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          className="w-full h-full border-0 bg-white"
        />
      </div>
    </div>
  );
};
