"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      disabled={copied}
      className="h-8 px-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-lg"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600 ml-1">Copied!</span>
        </>
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
}
