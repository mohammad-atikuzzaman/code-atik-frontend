import React, { useRef, useMemo, useEffect } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onApply?: () => void;
  readOnly?: boolean;
  language?: string;
}

export const CodeEditorWithGutter: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onApply,
  readOnly = false,
  language = "html",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Calculate line numbers
  const lines = useMemo(() => {
    const count = (value || "").split("\n").length;
    return Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1);
  }, [value]);

  // Sync scrolling between gutter and textarea
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle Tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      onApply?.();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 rounded-lg overflow-hidden border border-slate-900 select-text">
      {/* Editor Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-900/40 border-b border-slate-800/80 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span className="uppercase text-purple-400 font-semibold">{language}</span>
          <span>{lines.length} lines</span>
          <span>{value.length} characters</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[10px]">
          <span>Tab: 2 spaces</span>
          <span>•</span>
          <span>Ctrl+S / ⌘S to apply</span>
        </div>
      </div>

      {/* Editor Canvas: Line Numbers + Textarea */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-11 py-3 bg-slate-950/90 text-right pr-2 text-slate-600 font-mono text-xs select-none overflow-hidden border-r border-slate-800/60 leading-[20px]"
        >
          {lines.map((line) => (
            <div key={line} className="h-[20px]">
              {line}
            </div>
          ))}
        </div>

        {/* Textarea Code Body */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 py-3 px-3.5 bg-slate-950 text-slate-200 font-mono text-xs leading-[20px] resize-none outline-none focus:ring-0 border-0 whitespace-pre overflow-auto"
        />
      </div>
    </div>
  );
};
