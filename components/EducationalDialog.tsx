"use client";

import { useEffect, useRef } from "react";

interface EducationalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function EducationalDialog({
  isOpen,
  onClose,
  title,
  content,
}: EducationalDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 dialog-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg bg-surface-card border border-border rounded-xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
          <h3 className="text-2xl text-text">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <svg
              className="w-5 h-5 text-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <div className="space-y-4 text-lg">
            {content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("•")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("•"));
                return (
                  <ul key={index} className="list-none space-y-3 my-4">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray"
                      >
                        <span className="text-accent mt-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span>{item.replace("• ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const items = paragraph.split("\n").filter((l) => l.match(/^\d\./));
                return (
                  <ol key={index} className="list-none space-y-3 my-4">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray"
                      >
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-accent/10 text-accent rounded-full text-base font-medium">
                          {i + 1}
                        </span>
                        <span>{item.replace(/^\d\.\s*/, "")}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-gray leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-accent text-black font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
