"use client";

import { useState, useCallback } from "react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/FadeIn";

function TerminalCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx skills add rawgroundbeef/x402eco").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-[52px] right-4 font-mono text-[10px] tracking-[1px] uppercase text-gray-dim bg-surface-card border border-border rounded-[5px] px-3 py-1.5 cursor-pointer transition-all duration-150 hover:text-accent hover:border-accent/[0.12] hover:bg-accent/[0.12] z-[2]"
    >
      {copied ? "Copied" : "Copy install"}
    </button>
  );
}

const FEATURES = [
  {
    icon: "\uD83D\uDDC2",
    title: "Full Directory",
    desc: "Every SDK, service, facilitator, and learning resource \u2014 indexed and searchable by your agent.",
  },
  {
    icon: "\uD83D\uDD04",
    title: "Always Current",
    desc: "Syncs with x402.eco on every run. New ecosystem entries are instantly discoverable.",
  },
  {
    icon: "\uD83E\uDD16",
    title: "Agent-Agnostic",
    desc: "Works with Claude Code, Cursor, Windsurf, and any environment that supports skills.",
  },
];

const ENVIRONMENTS = [
  "Claude Code",
  "Cursor",
  "Windsurf",
  "Any MCP-compatible agent",
];

export function MetaSkillSection() {
  return (
    <section className="py-20 md:py-22 relative overflow-hidden">
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200, 255, 0, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-gray-dim mb-4">
              For developers &amp; agents
            </p>
            <h2 className="text-text mb-4" style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "3px" }}>
              One Skill.<br />
              <span className="text-accent">Every Resource.</span>
            </h2>
            <p className="font-mono text-sm text-gray leading-[1.7] max-w-[600px] mx-auto">
              Install the x402 ecosystem skill and give your agent instant access to every SDK, service, facilitator, and tool in the network. No manual discovery. No config files. Just install and build.
            </p>
          </div>
        </FadeIn>

        {/* Terminal Block */}
        <FadeIn delay={0.1}>
          <div className="max-w-[720px] mx-auto mb-12 relative">
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {/* Terminal chrome bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex gap-[7px]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f87171", opacity: 0.6 }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#fbbf24", opacity: 0.6 }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#34d399", opacity: 0.6 }} />
                </div>
                <span className="font-mono text-[11px] text-gray-dim tracking-[0.5px]">terminal</span>
                <div className="w-[44px]" />
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-[13px] leading-[2]">
                <div className="text-gray-dim italic"># Install the x402 ecosystem skill</div>
                <div>
                  <span className="text-accent mr-2">$</span>
                  <span className="text-text">npx skills add rawgroundbeef/x402eco</span>
                </div>

                <div className="mt-3">
                  <span className="text-green">{"\u2713"} x402-ecosystem skill installed</span>
                </div>
                <div>
                  <span className="text-green">{"\u2713"} Your agent can now discover any x402 resource</span>
                </div>

                <div className="mt-3 text-gray-dim italic"># Ask your agent anything about x402</div>
                <div>
                  <span className="text-accent mr-2">$</span>
                  <span className="text-text">claude </span>
                  <span className="text-accent">&quot;How do I accept x402 payments in my Express API?&quot;</span>
                </div>
              </div>
            </div>

            <TerminalCopyButton />
          </div>
        </FadeIn>

        {/* Feature Cards */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[720px] mx-auto mb-12" staggerDelay={0.1}>
          {FEATURES.map((feature) => (
            <FadeInStaggerItem key={feature.title}>
              <div className="p-5 bg-surface-raised border border-border rounded-[10px] text-center h-full">
                <div className="text-[22px] mb-2.5 opacity-90">{feature.icon}</div>
                <h4 className="text-text mb-1.5" style={{ fontSize: "16px", letterSpacing: "1.5px" }}>
                  {feature.title}
                </h4>
                <p className="font-mono text-[11px] text-gray leading-[1.6]">{feature.desc}</p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* Environment Badges */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
            {ENVIRONMENTS.map((env) => (
              <div key={env} className="flex items-center gap-2 font-mono text-xs text-gray tracking-[0.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70" />
                {env}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
