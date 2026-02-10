const CHAINS = [
  { id: 'base', name: 'Base', colorLogo: '/logos/base-color.svg', monoLogo: '/logos/base.svg', url: 'https://base.org' },
  { id: 'solana', name: 'Solana', colorLogo: '/logos/solana-color.svg', monoLogo: '/logos/solana.svg', url: 'https://solana.com' },
  { id: 'allium', name: 'Allium', colorLogo: '/logos/allium-color.svg', monoLogo: '/logos/allium.svg', isDataPartner: true, url: 'https://allium.so' },
  { id: 'aibtc', name: 'aibtc', colorLogo: '/logos/aibtc.svg', monoLogo: '/logos/aibtc.svg', url: 'https://aibtc.dev' },
];

/**
 * Hero Trust Strip - displays chain logos with labels between FAQ links and stats bar
 */
export function HeroChainStrip() {
  return (
    <div className="mt-12 mb-10">
      <p className="text-center font-mono text-[10px] tracking-[2px] uppercase text-gray-dim mb-4">
        In partnership with
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-9">
      {CHAINS.map((chain) => (
        <a
          key={chain.id}
          href={chain.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-250"
        >
          <img
            src={chain.colorLogo}
            alt={chain.name}
            className={`w-[20px] h-[20px] md:w-[22px] md:h-[22px] ${chain.id === 'allium' ? 'dark:invert' : ''}`}
          />
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[1.5px] text-white font-bold">
            {chain.name}
          </span>
        </a>
      ))}
      </div>
    </div>
  );
}

/**
 * Section Divider Bar - displays chain icons between hero and ecosystem
 */
export function ChainDividerBar() {
  return (
    <section className="chain-divider-bar border-t border-b border-border py-8 px-10">
      <div className="flex items-center justify-center gap-7 md:gap-10">
        {CHAINS.map((chain) => (
          <a
            key={chain.id}
            href={chain.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={chain.colorLogo}
              alt={chain.name}
              className={`w-6 h-6 md:w-7 md:h-7 ${chain.id === 'allium' ? 'dark:invert' : ''}`}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

// Legacy export for backwards compatibility
export function PartnerLogos() {
  return <ChainDividerBar />;
}
