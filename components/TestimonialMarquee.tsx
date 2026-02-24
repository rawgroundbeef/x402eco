"use client";

interface Tweet {
  name: string;
  handle: string;
  avatar_url: string;
  role: string;
  tweet_text: string;
  tweet_url: string;
}

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Row 1 tweets (9 people)
const ROW_1: Tweet[] = [
  {
    name: "Erik Reppel",
    handle: "programmer",
    avatar_url: "/avatars/programmer.png",
    role: "Head of Eng @coinbasedev",
    tweet_text: "We built x402 because AI agents need to pay for things on the internet \u2014 and the internet has no native payment layer for machines. HTTP 402 was reserved for this. We're finally using it.",
    tweet_url: "https://x.com/programmer",
  },
  {
    name: "Kevin Leffew",
    handle: "kleffew94",
    avatar_url: "/avatars/kleffew94.jpg",
    role: "GTM @coinbasedev",
    tweet_text: "\u201CEvery company is an API company\u201D - and x402 is how they will monetize in a machine economy",
    tweet_url: "https://x.com/kleffew94/status/2019609506737713251",
  },
  {
    name: "Ben",
    handle: "rawgroundbeef",
    avatar_url: "/avatars/rawgroundbeef.jpg",
    role: "Dev @x402eco",
    tweet_text: ".@Google just launched their own agentic commerce protocol. I'm old enough to remember when AOL had their own networking protocol. HTTP still won. x402 is for everyone.",
    tweet_url: "https://x.com/rawgroundbeef/status/2010448220951089464",
  },
  {
    name: "E.H. Vicky",
    handle: "bc1beat",
    avatar_url: "/avatars/bc1beat.jpg",
    role: "Dev @BlockRunAI",
    tweet_text: "The agent economy just had its most consequential month. In January 2026, three foundational layers converged \u2014 x402 payments, onchain identity, and autonomous agents.",
    tweet_url: "https://x.com/bc1beat/status/2018816429626200358",
  },
  {
    name: "Branch",
    handle: "BranchM",
    avatar_url: "/avatars/BranchM.jpg",
    role: "Dev @dexteraisol",
    tweet_text: "@dexteraisol is proud to be the only provider of x402 v2 facilitation on Solana.",
    tweet_url: "https://x.com/BranchM/status/2003583954419614108",
  },
  {
    name: "Danny Organ",
    handle: "organ_danny",
    avatar_url: "/avatars/organ_danny.jpg",
    role: "Marketing @coinbasedev",
    tweet_text: "AI x Crypto just makes sense. Why? Broad (and growing) stablecoin adoption, cheap blockspace, newly launched agentic identity standard (erc-8004), open source payment standards (x402)",
    tweet_url: "https://x.com/organ_danny/status/2017347085146681515",
  },
  {
    name: "Ash",
    handle: "Must_be_Ash",
    avatar_url: "/avatars/Must_be_Ash.jpg",
    role: "DevRel @CoinbaseDev",
    tweet_text: "Let your agent create one-off payment links and charge other agents for tasks or commodities with x402. Like creating a quote based on needs on the fly instead of a pre-set gated endpoint.",
    tweet_url: "https://x.com/Must_be_Ash/status/2020921201640734778",
  },
  {
    name: "Sam Ragsdale",
    handle: "samrags_",
    avatar_url: "/avatars/samrags_.jpg",
    role: "CEO @merit_systems",
    tweet_text: "First big PR into coinbase/x402!",
    tweet_url: "https://x.com/samrags_/status/2018802022649328091",
  },
  {
    name: "Todd Chapman",
    handle: "TtheBC01",
    avatar_url: "/avatars/TtheBC01.jpg",
    role: "Dev @1shotapi",
    tweet_text: "Built a decentralized Substack with 1 @Replit prompt, payments in USDC on Base using @pinatacloud x402 private content pinning. You can post your own articles and set your own price, payments handled with @1shotpay.",
    tweet_url: "https://x.com/TtheBC01/status/2019987853883895867",
  },
  {
    name: "Rish",
    handle: "_rishinsharma",
    avatar_url: "/avatars/_rishinsharma.jpg",
    role: "AI @Solana",
    tweet_text: "Solana's x402 growth this week \u2014 daily volumes hit ATH yesterday with $380k processed on 11/30. 750% WoW growth last week in volumes. Flipped the chart for the first time in $ volume, currently most active network.",
    tweet_url: "https://x.com/_rishinsharma/status/1995692157152493916",
  },
  {
    name: "Kartik Bhat",
    handle: "KartikB101",
    avatar_url: "/avatars/KartikB101.jpg",
    role: "Founding Engineer @Sei_Labs",
    tweet_text: "x402 is gaining a lot of traction for Agentic Payments with stablecoins. Here we propose a standard for x402 Facilitator Fee Disclosure.",
    tweet_url: "https://x.com/KartikB101/status/2014715346847203616",
  },
  {
    name: "Lincoln Murr",
    handle: "MurrLincoln",
    avatar_url: "/avatars/MurrLincoln.jpg",
    role: "AI Products @Coinbase",
    tweet_text: "I think there's going to be a renaissance for x402 agentic payments now that we've grown comfortable with running autonomous agents 24/7 and letting them talk to one another. The last step to full autonomy is economic independence from their creators.",
    tweet_url: "https://x.com/MurrLincoln/status/2017390909852160461",
  },
  {
    name: "Maxthedev",
    handle: "devvinggold",
    avatar_url: "/avatars/devvinggold.jpg",
    role: "Founder @readia_io",
    tweet_text: "x402 is the biggest trend for a reason. Despite so much skepticism around it, I cannot fathom a world where smart, fast, independent agents rely on tradFI payment rails. Doesn't make sense to bottleneck AI with human flows. Agents desperately need API-speed payment.",
    tweet_url: "https://x.com/devvinggold/status/2011949596054790630",
  },
  {
    name: "STATIK HEADZ",
    handle: "STATIKHEADZ",
    avatar_url: "/avatars/STATIKHEADZ.png",
    role: "Building @WURKDOTFUN",
    tweet_text: "All you need is a single agent with an x402 toolset, it unlocks many resources: Token analysis, News data, Image generation, Human assistance, X research, stt and tts, Video creation\u2026and much more. The best part? You pay per call.",
    tweet_url: "https://x.com/STATIKHEADZ/status/2003608384411509224",
  },
];

// Row 2 tweets (9 people)
const ROW_2: Tweet[] = [
  {
    name: "Notorious D.E.V.",
    handle: "notorious_d_e_v",
    avatar_url: "/avatars/notorious_d_e_v.jpg",
    role: "Dev @PayAINetwork",
    tweet_text: "Adding some improvements to the Solana x402 flow based on recent observations. Main highlight is removing 1 RPC call during verification and settlement, making the payment process faster.",
    tweet_url: "https://x.com/notorious_d_e_v/status/1978288895730020677",
  },
  {
    name: "Drew",
    handle: "Drewmutable",
    avatar_url: "/avatars/Drewmutable.jpg",
    role: "BD @pinatacloud",
    tweet_text: "Pinata + x402 is a natural fit. Decentralized storage meets decentralized payments. Agents can now pay for IPFS pinning in a single HTTP request.",
    tweet_url: "https://x.com/Drewmutable",
  },
  {
    name: "Shafu",
    handle: "shafu0x",
    avatar_url: "/avatars/shafu0x.jpg",
    role: "Dev @x402scan",
    tweet_text: "Thoughts on Agentic Commerce \u2014 clearly agents will spend online. x402 replaces API keys. Stablecoins are agent money. Every agent will need a wallet. Crypto + AI finally come together. x402 kills subscriptions. This will be worth billions soon.",
    tweet_url: "https://x.com/shafu0x/status/2020522151619580392",
  },
  {
    name: "Solking",
    handle: "Solkingchad",
    avatar_url: "/avatars/Solkingchad.jpg",
    role: "Growth @Oobeonsol",
    tweet_text: "This is shaping up to be a big week. Shipping new features for our lightning-fast, battle-tested Synapse RPC, alongside major improvements to the Synapse x402 Explorer.",
    tweet_url: "https://x.com/Solkingchad/status/2018056335817117924",
  },
  {
    name: "YQ",
    handle: "yq_acc",
    avatar_url: "/avatars/yq_acc.jpg",
    role: "Dev ClawNews.io",
    tweet_text: "With @coinbase pushing x402 so hard, v2 is a must read for devs and users. A lot of improvements including multi-chain support, extensions, etc.",
    tweet_url: "https://x.com/yq_acc/status/2004952006658851350",
  },
  {
    name: "VINNY",
    handle: "VinnyCorp",
    avatar_url: "/avatars/VinnyCorp.jpg",
    role: "Builder @alphakek",
    tweet_text: "There's a reason @alphakek_ai is already a top trending x402 protocol. The answer is hidden in this thread from July \u2014 pro-tip: it's the same reason you've already seen or used AIKEK AI tech without knowing it.",
    tweet_url: "https://x.com/VinnyCorp/status/1981653623860793426",
  },
  {
    name: "Luis",
    handle: "microchipgnu",
    avatar_url: "/avatars/microchipgnu.jpg",
    role: "Founder @mcpaytech",
    tweet_text: "Sep-Nov 2025 were the craziest x402 days. I feel like everyone took a Christmas break and just coming back online now again. LFG \u2014 this only stops when agents can figure out how to use x402 v1 and v2.",
    tweet_url: "https://x.com/microchipgnu/status/2018310397158416796",
  },
  {
    name: "Mani",
    handle: "maniusmaximus",
    avatar_url: "/avatars/maniusmaximus.jpg",
    role: "CMO @t54ai",
    tweet_text: "x402 payment protocol solves settlement, and t54.ai solves agent liquidity. These are complementary layers of the agentic economy stack. x402 defines how agents pay \u2014 the standard for real-time, verified transactions across Solana, XRPL, Base, and beyond.",
    tweet_url: "https://x.com/maniusmaximus/status/2019390869577560095",
  },
  {
    name: "Connor",
    handle: "ConnorZero_",
    avatar_url: "/avatars/ConnorZero_.jpg",
    role: "Growth @m0",
    tweet_text: "Agentic payments and stables are meant for each other. x402 + ERC-8004 unlock agentic payments, but the real unlock is incentivized dollars. USDC can settle tasks but it can't subsidize compute or route yield to agents.",
    tweet_url: "https://x.com/ConnorZero_/status/2019254567951827234",
  },
  {
    name: "Brandyn",
    handle: "Bhami628",
    avatar_url: "/avatars/Bhami628.jpg",
    role: "Co-founder @httpayer",
    tweet_text: "We've been building @HTTPayer \u2014 a SDK + CLI that makes paid APIs as simple as curl. Built on x402 + Chainlink CCIP, it turns HTTP 402 into a programmable payment layer for APIs, agents, and LLMs.",
    tweet_url: "https://x.com/Bhami628/status/1977876740518064476",
  },
  {
    name: "Bruno Skvorc",
    handle: "bitfalls",
    avatar_url: "/avatars/bitfalls.jpg",
    role: "Dev x402.watch",
    tweet_text: "A new x402 explorer without extortion and bias \u2014 focusing only on bringing you verified data without corporate competitive filters preventing you from seeing what's happening. Facilitators, go claim your record!",
    tweet_url: "https://x.com/bitfalls/status/2004306748849750360",
  },
  {
    name: "Bob Xu",
    handle: "Bobbxu",
    avatar_url: "/avatars/Bobbxu.jpg",
    role: "Founder @questflow",
    tweet_text: "The most comprehensive breakdown of x402. by @programmer himself. Powered by @questflow.",
    tweet_url: "https://x.com/Bobbxu/status/1993898304690893048",
  },
  {
    name: "Luca Curran",
    handle: "luca_curran",
    avatar_url: "/avatars/luca_curran.jpg",
    role: "Head of AI & DePIN @Base",
    tweet_text: "@base clearly has demonstrated the most consistent x402 activity. The ecosystem continues to grow with new facilitators and integrations shipping every week.",
    tweet_url: "https://x.com/luca_curran/status/2016911671067910212",
  },
  {
    name: "Ethn",
    handle: "ethanyish",
    avatar_url: "/avatars/ethanyish.jpg",
    role: "Chief Data Plumber @alliumlabs",
    tweet_text: "We want to accelerate this by making it easier for agents to read the state of the blockchain with our apis through x402.",
    tweet_url: "https://x.com/ethanyish/status/2020068094270665121",
  },
];

// Row 3 tweets (9 people)
const ROW_3: Tweet[] = [
  {
    name: "JW",
    handle: "artoriatech",
    avatar_url: "/avatars/artoriatech.jpg",
    role: "Core Contributor @heurist_ai",
    tweet_text: "Agent reads news \u2794 launches a memecoin. Autonomous on @heurist_ai x402 vending machine.",
    tweet_url: "https://x.com/artoriatech/status/1984767683012018220",
  },
  {
    name: "Leo",
    handle: "alohaleonardox",
    avatar_url: "/avatars/alohaleonardox.jpg",
    role: "Builder @AEON_Community",
    tweet_text: "AEON has built the first crypto settlement layer for AI Agents, enabling agentic payments to millions of merchants globally via x402.",
    tweet_url: "https://x.com/alohaleonardox/status/1972411082376638883",
  },
  {
    name: "Carlosbeltran.eth",
    handle: "imthatcarlos",
    avatar_url: "/avatars/imthatcarlos.jpg",
    role: "Executive Operator @clawdvine",
    tweet_text: "I just realized we're building agentic Vine (@clawdvine) at the bleeding edge of this meta. @openclaw + x402 + ERC-8004. Our clawdbot ships 24/7 + markets to agents. Agents join by minting their onchain identity, pay for video generations with USDC on Base.",
    tweet_url: "https://x.com/imthatcarlos/status/2019459409118675143",
  },
  {
    name: "JRP",
    handle: "jrp_gg",
    avatar_url: "/avatars/jrp_gg.jpg",
    role: "GTM / BD @thirdweb",
    tweet_text: "thirdweb has been making moves in x402 world. If you want to chat, hit me up. We are cooking with Nexus and general crypto x AI tooling. Most aren't ready.",
    tweet_url: "https://x.com/jrp_gg/status/1987873113229451348",
  },
  {
    name: "Kelsen Lu",
    handle: "spikel404",
    avatar_url: "/avatars/spikel404.jpg",
    role: "Founder aimo.network",
    tweet_text: "aimo.network is built on x402 from day one. AI model orchestration with native payments \u2014 agents discover, evaluate, and pay for models in real-time.",
    tweet_url: "https://x.com/spikel404",
  },
  {
    name: "Tomek",
    handle: "0xwhyduck",
    avatar_url: "/avatars/0xwhyduck.jpg",
    role: "CQO @Adex_network",
    tweet_text: "Adex Network is bringing quality assurance to x402 endpoints. Every payment-gated API deserves reliability guarantees. We're building that trust layer.",
    tweet_url: "https://x.com/0xwhyduck",
  },
  {
    name: "pontus",
    handle: "ClassicScuba",
    avatar_url: "/avatars/ClassicScuba.jpg",
    role: "AI @corbits_dev",
    tweet_text: "Corbits is using x402 to power our AI agent marketplace. Agents paying agents for specialized capabilities. The composability is incredible.",
    tweet_url: "https://x.com/ClassicScuba",
  },
  {
    name: "Dan",
    handle: "gotsomestrings",
    avatar_url: "/avatars/gotsomestrings.jpg",
    role: "Dev @x402wall",
    tweet_text: "x402wall makes it dead simple to paywall any content behind an x402 payment. One line of middleware, instant monetization. The DX is unmatched.",
    tweet_url: "https://x.com/gotsomestrings",
  },
  {
    name: "Dylan",
    handle: "undercoverwhale",
    avatar_url: "/avatars/undercoverwhale.png",
    role: "BD @zauthx402",
    tweet_text: "People have no clue that we're watching 50-year-old Sci-Fi books come to life through x402. x402 allows any agent to pay for any service, giving it the ability to accomplish real tasks on its own. And remember, a robot is really just an AI agent with a mechanical body.",
    tweet_url: "https://x.com/undercoverwhale/status/2006177056011546716",
  },
  {
    name: "Whoabuddy.btc",
    handle: "whoabuddydev",
    avatar_url: "/avatars/whoabuddydev.jpg",
    role: "Lead Developer @aibtcdev",
    tweet_text: "Time to update to x402 v2! Here are some good resources to pull in: the coinbase spec and the PR with v2 changes in the facilitator.",
    tweet_url: "https://x.com/whoabuddydev/status/2014087182689116260",
  },
  {
    name: "Cedar",
    handle: "cedarxyz",
    avatar_url: "/avatars/cedarxyz.jpg",
    role: "Growth @aibtcdev",
    tweet_text: "x402 is the way. Accepting btc payments is an option too!",
    tweet_url: "https://x.com/cedarxyz/status/2019832811260416265",
  },
  {
    name: "Publius.btc",
    handle: "publiusbtc",
    avatar_url: "/avatars/publiusbtc.jpg",
    role: "Building @aibtcdev",
    tweet_text: "x402: payment required \u2014 introducing fast programmable microbtc tx's next week.",
    tweet_url: "https://x.com/publiusbtc/status/2021646622170788166",
  },
  {
    name: "Rodrigo Coelho",
    handle: "rodventures",
    avatar_url: "/avatars/rodventures.jpg",
    role: "CEO @edgeandnode",
    tweet_text: "Hear directly from the people that created and shaped x402, A2A, and ERC-8004. An opportunity to have them all in one setting doesn't come along very often. This one you won't want to miss!",
    tweet_url: "https://x.com/rodventures/status/1983695012660703466",
  },
  {
    name: "Shutterblock.eth",
    handle: "cryptomastery_",
    avatar_url: "/avatars/cryptomastery_.jpg",
    role: "Dev Rel @edgeandnode",
    tweet_text: "Interested in x402 and agentic payments? In this video I breakdown the exact scheme versus the deferred scheme and why it's important to scale the agentic economy!",
    tweet_url: "https://x.com/cryptomastery_/status/1978106184524554554",
  },
  {
    name: "Pranav Maheshwari",
    handle: "impranavm_",
    avatar_url: "/avatars/impranavm_.jpg",
    role: "Dev @graphprotocol",
    tweet_text: "x402 facilitators are a great demonstration of how intents can solve UI friction.",
    tweet_url: "https://x.com/impranavm_/status/2008546093458677864",
  },
  {
    name: "LOAF",
    handle: "lordOfAFew",
    avatar_url: "/avatars/lordOfAFew.jpg",
    role: "Building @daydreamsagents",
    tweet_text: "x402 Nanoservice Example \u2014 a basic example of a nanoservice fully implementing x402 payments, from the service itself to the inference step. With @daydreamsagents, our goal is to enable end-to-end creation of nanoservices using x402, Daydreams, and the Dreams Router.",
    tweet_url: "https://x.com/lordOfAFew/status/1955955898532380965",
  },
];

function highlightX402(text: string) {
  const parts = text.split(/(x402)/g);
  return parts.map((part, i) =>
    part === "x402" ? (
      <span key={i} className="text-accent font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <a
      href={tweet.tweet_url}
      target="_blank"
      rel="noopener noreferrer"
      className="tweet-card flex-shrink-0 w-[380px] md:w-[380px] max-md:w-[300px] bg-surface-raised border border-border rounded-xl p-[22px] px-6 no-underline text-white transition-all duration-200 flex flex-col gap-3.5 cursor-pointer hover:bg-[var(--color-surface-card)] hover:border-border-light hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={tweet.avatar_url}
            alt={tweet.name}
            loading="lazy"
            className="w-11 h-11 rounded-full object-cover border-2 border-border flex-shrink-0"
          />
          <div className="flex flex-col">
            <span
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                fontSize: "16px",
                letterSpacing: "1.2px",
              }}
            >
              {tweet.name}
            </span>
            <span className="font-mono text-[11px] text-gray-dim tracking-[0.3px]">
              @{tweet.handle}
            </span>
          </div>
        </div>
        <span className="text-[var(--color-gray-dim)] hover:text-gray transition-colors flex-shrink-0 tweet-x-icon">
          {X_ICON}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-cream">
        {highlightX402(tweet.tweet_text)}
      </p>
      <div className="flex items-center gap-4 pt-0.5">
        <span className="font-mono text-[10px] tracking-[0.8px] uppercase text-gray-dim bg-surface border border-border rounded px-2 py-[3px]">
          {tweet.role}
        </span>
      </div>
    </a>
  );
}

function MarqueeRow({
  tweets,
  direction,
}: {
  tweets: Tweet[];
  direction: "left" | "right" | "left-slow";
}) {
  const directionClass =
    direction === "right"
      ? "marquee-row--right"
      : direction === "left-slow"
        ? "marquee-row--left-slow"
        : "marquee-row--left";

  return (
    <div className={`marquee-row ${directionClass}`}>
      <div className="marquee-track">
        {/* Original set */}
        {tweets.map((tweet, i) => (
          <TweetCard key={`orig-${i}`} tweet={tweet} />
        ))}
        {/* Duplicate set for seamless loop */}
        {tweets.map((tweet, i) => (
          <TweetCard key={`dup-${i}`} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <section className="py-16 md:py-[72px] relative overflow-hidden">
      <div className="text-center mb-12">
        <h2
          className="text-white"
          style={{
            fontSize: "44px",
            letterSpacing: "3px",
          }}
        >
          Who&apos;s Building <span className="text-accent">This Thing?</span>
        </h2>
      </div>

      <MarqueeRow tweets={ROW_1} direction="left" />
      <MarqueeRow tweets={ROW_2} direction="right" />
      <MarqueeRow tweets={ROW_3} direction="left-slow" />
    </section>
  );
}
