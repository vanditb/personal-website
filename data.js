export const siteContent = {
  profile: {
    name: "vandit bhatia",
    identity: "i build ai + finance projects and ship consistently.",
    about: [
      "i’m a 16-year-old high school student interested in finance and technology.",
      "i started getting into investing and trading in middle school, mostly just trying to understand how markets actually work and why things move the way they do. over time, that turned into a deeper interest in building tools around it instead of just watching from the outside.",
      "recently, i’ve been spending more time building small projects, mostly around ai and finance, and using them to explore ideas i’m curious about. i keep a running build log of everything i work on, partly to stay consistent, and partly to see how my thinking evolves over time."
    ],
    currentlyWorking: {
      label: "currently working on",
      title: "news-based trading model",
      detail: "(analyze global events → detect patterns → suggest trades)"
    }
  },
  contact: {
    email: "vandit.bhatia19@gmail.com",
    socials: [
      { label: "x", url: "https://x.com/vanditb" },
      { label: "tiktok", url: "https://www.tiktok.com/@vanditb" },
      { label: "linkedin", url: "https://www.linkedin.com/in/vanditb" },
      { label: "github", url: "https://github.com/vanditb" }
    ]
  },
  projects: [
    {
      id: "news-model",
      name: "news-based trading model",
      blurb: "a research tool for connecting news flow, market reactions, and possible trade ideas.",
      description:
        "this project looks at global events, searches for repeated reactions across sectors and names, and turns that into a more structured way to think through trade setups.",
      why: "i wanted something that helps me move from headlines to a real process instead of reacting to noise.",
      github: "https://github.com/vanditb/news-based-trading-model",
      demo: null,
      year: "2026",
      status: "in progress"
    },
    {
      id: "market-mirror",
      name: "market mirror",
      blurb: "a cleaner daily view of market moves, sectors, and momentum.",
      description:
        "market mirror compresses a lot of market context into a smaller surface so it is easier to scan trends, follow watchlists, and notice when leadership starts to shift.",
      why: "i built it because i wanted a market tool that feels light enough to open every day.",
      github: "https://github.com/vanditb/market-mirror",
      demo: "https://market-mirror-demo.vercel.app",
      year: "2026",
      status: "live"
    },
    {
      id: "alpha-notes",
      name: "alpha notes",
      blurb: "an ai notebook for turning research and reading into usable notes.",
      description:
        "alpha notes helps collect articles, reports, and raw ideas, then rewrites them into shorter takeaways, open questions, and next steps.",
      why: "it came out of wanting a better bridge between reading and actually building.",
      github: "https://github.com/vanditb/alpha-notes",
      demo: null,
      year: "2026",
      status: "active"
    },
    {
      id: "earnings-radar",
      name: "earnings radar",
      blurb: "a simple tracker for upcoming earnings and the first reaction after the print.",
      description:
        "earnings radar keeps a tight list of companies reporting soon, adds quick context before the release, and logs how price and volume behave right after.",
      why: "i wanted a cleaner system for studying earnings consistently instead of checking them too late.",
      github: "https://github.com/vanditb/earnings-radar",
      demo: "https://earnings-radar-demo.vercel.app",
      year: "2026",
      status: "live"
    }
  ],
  buildLog: [
    {
      date: "2026-04-14",
      entry: "shipped first clean version of the personal site",
      tag: "website"
    },
    {
      date: "2026-04-12",
      entry: "tightened project copy and simplified layout",
      tag: "website"
    },
    {
      date: "2026-04-11",
      entry: "set up the build log structure",
      tag: "system"
    },
    {
      date: "2026-04-09",
      entry: "refined the news model flow after testing rough inputs",
      tag: "news model"
    },
    {
      date: "2026-04-05",
      entry: "added clearer research summaries inside alpha notes",
      tag: "alpha notes"
    },
    {
      date: "2026-03-27",
      entry: "cleaned up older experiments and removed noisy ideas",
      tag: "signal lab"
    },
    {
      date: "2026-03-18",
      entry: "started a better daily workflow for market research",
      tag: "system"
    }
  ]
};
