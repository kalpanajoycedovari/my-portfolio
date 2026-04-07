"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
};

const HARDCODED_POSTS: Post[] = [
  {
    id: "1744000001",
    title: "The Universe is Too Big and I Can't Stop Thinking About It",
    tag: "Space",
    date: "2025-03-10T20:14:00.000Z",
    content: `There's this thing that happens to me at around 2am where I open one Wikipedia article about dark matter and suddenly it's 4am and I've somehow ended up reading about the heat death of the universe and I can't sleep anymore.

The Observable Universe is 93 billion light-years in diameter. That's the part we can see. The actual universe is probably infinite. Infinite. Not "very large." Infinite. There is no edge. It just... goes.

And what gets me the most isn't the size — it's that we're sitting on a rock, orbiting a medium-sized star, in one of an estimated 2 trillion galaxies, and we somehow decided to name a cat "Mr. Whiskers" and argue about pineapple on pizza.

My current obsession: the Fermi Paradox. The universe is 13.8 billion years old. Life on Earth has existed for about 3.8 billion years. Statistically, the odds of us being the only intelligent life in the entire observable universe are essentially zero. So where is everyone?

Some theories: they're out there but too far away for signals to reach us yet. Advanced civilisations destroy themselves before they can communicate (not comforting). We're in a simulation and the developers haven't populated the rest of the map yet (my personal favourite). The "Great Filter" is ahead of us, not behind us (the least fun option).

I don't have answers. I just have an alarming browser history and a deep need to talk about this at dinner parties nobody invited me to.`,
  },
  {
    id: "1744000002",
    title: "The Bermuda Triangle is Real and I Will Die on This Hill",
    tag: "Mysteries",
    date: "2025-03-18T22:30:00.000Z",
    content: `Before you @ me — I know. I know the scientific consensus. I know Lloyd's of London doesn't even charge higher insurance rates for ships crossing it. I know most of the "disappearances" are either exaggerated or have completely mundane explanations.

I know all of this. And yet.

Flight 19 is the one that lives in my head rent-free. December 5, 1945. Five US Navy bombers set off on a training mission. All experienced pilots. Clear weather. And then the radio transmissions start getting wrong. The lead pilot says his compass is going haywire. He says they don't know where they are. He says the ocean doesn't look right. And then they're gone. All five planes. 14 men. The rescue plane sent after them also vanished.

The official explanation: disorientation, fuel exhaustion, the sea. My brain: THEN EXPLAIN THE COMPASS.

I'm not saying it's aliens. I'm not saying it's a portal. I'm saying the ocean is 3.8 million square kilometres of water with an average depth of 3,332 metres and we have mapped more of the surface of Mars than the bottom of our own seas. Methane hydrate eruptions can sink ships without warning. Strange magnetic anomalies exist. Rogue waves 30 metres tall appear out of nowhere.

The Bermuda Triangle might not be supernatural. But it's not boring either. And I will keep reading about it at midnight until further notice.`,
  },
  {
    id: "1744000003",
    title: "Why I Can't Stop Reading About Aviation Accidents",
    tag: "Aviation",
    date: "2025-03-25T19:45:00.000Z",
    content: `People find this one unsettling when I bring it up. "You just... read about plane crashes? For fun?"

Not for fun, exactly. For understanding.

Aviation accident investigation is one of the most rigorous, honest, and genuinely noble fields of human endeavour. When something goes wrong, the NTSB or AAIB doesn't look for someone to blame and stop there. They reconstruct every second of the flight. They interview every witness. They analyse every piece of wreckage. And then they publish everything publicly. For free. For everyone.

MH370 is the one that broke me. March 8, 2014. A Boeing 777 with 239 people on board takes off from Kuala Lumpur, and then forty minutes into the flight the transponder goes off. It turns left. Military radar tracks it flying back across the Malaysian peninsula, then out over the Indian Ocean. And then nothing.

What haunts me isn't the mystery. It's the deliberateness. Someone turned off the transponder. Someone reprogrammed the route. Whoever was in that cockpit knew exactly what they were doing. And we still don't know why.

I read these reports because they remind me that systems matter. Checklists matter. Speaking up matters. And I think everyone who builds software — especially AI systems that real people will rely on — should read at least one accident report in their lives. The black box always tells the truth. Build things worthy of that standard.`,
  },
  {
    id: "1744000004",
    title: "I Joined a Racing Community and I Have Made a Terrible Mistake",
    tag: "Life",
    date: "2025-04-01T17:20:00.000Z",
    content: `So. I joined a racing community.

I want to be clear that I did not do this because I am a person who races things. I did this because someone in a Discord server I'm in mentioned it and it sounded interesting and now I'm three weeks in and I have opinions about tyre compounds.

Here is what I knew about motorsport before joining: cars go fast. Someone wins. There is a chequered flag.

Here is what I know now: there are like six different tyre compounds and each one has an optimal temperature window and if you push a cold tyre too hard you'll grain it and then your lap times fall off a cliff and the strategy team will be very disappointed in you. I don't even own a car. This information is living in my head instead of something useful like remembering to reply to emails.

I've also apparently developed a Completely Normal interest in data telemetry. Because modern racing cars generate an enormous amount of data — brake pressure, steering angle, throttle input, tyre temperature, suspension travel — and teams analyse all of it to find hundredths of seconds. This is essentially just machine learning with more G-force.

I now wake up on race weekends. I have opinions about qualifying formats. I watched a full replay of a race from 2019 because someone told me the strategy battle was insane and they were right. Send help. Or don't. I'm fine. I'm absolutely fine.`,
  },
  {
    id: "1744000005",
    title: "Learning Go at 11pm: A Comedy in Several Acts",
    tag: "Tech",
    date: "2025-04-03T23:10:00.000Z",
    content: `Act 1: The Hubris

"Go is supposed to be simple," I said. "I'll just pick it up in a weekend," I said. "How hard can it possibly be," I said, a person who has clearly never learned anything about herself.

Act 2: The Goroutines

Goroutines are lightweight threads. Channels are how they communicate. The first time I tried to use a channel I wrote a deadlock so pure that the program just stopped. Didn't crash. Didn't error. Just stopped. Like it was embarrassed for me and decided to spare us both.

Act 3: The Error Handling

In Go, there are no exceptions. Functions return errors as values. You check them manually. Every time. I have written "if err != nil { return err }" approximately 47 times in the last week. My muscle memory now types it automatically. I wrote it in a Google Doc by accident.

Act 4: The Part Where I Admitted It Was Actually Good

After the initial confusion, Go is genuinely satisfying to write. The compiler is fast. The error messages are clear. When code compiles in Go, it usually works, because the compiler absolutely will not let you get away with anything suspicious. It's like having a very strict but fair teacher. Annoying in the moment. Genuinely helpful in the long run.

I wrote a small web scraper in Go last night and it ran first try and I felt like a genius even though I had to Google how to make an HTTP request. Progress.`,
  },
  {
    id: "1744000006",
    title: "Zig: I Have Made 5 Mistakes and Learned From None of Them",
    tag: "Tech",
    date: "2025-04-05T00:42:00.000Z",
    content: `My GitHub commit message for my Zig repository is: "feat: lol i made 5 mistakes - learning by making mistakes." This is an accurate summary of my Zig journey so far.

Mistake 1: Assuming Zig would tell me what was wrong in plain English. Zig tells you exactly what is wrong in precise, technical terms. These are not always terms I know yet.

Mistake 2: Forgetting that in Zig, you must handle every possible error. Not "errors that seem likely." Every. Possible. Error. I used the try keyword incorrectly approximately four times before I understood what it was doing.

Mistake 3: Thinking I understood memory management because I'd used Python for three years. Python was hiding everything from me like a loving parent who does all the chores while you think you're being independent.

Mistake 4: Writing std.io.getStdOut() in Zig 0.15.2. This does not exist anymore. The correct method is std.debug.print(). I learned this after twenty minutes of confusion.

Mistake 5: Starting at midnight. All of these mistakes happened between midnight and 2am. I have not learned from this either.

And yet — there is something about Zig that is pulling me in. It forces you to think about what the computer is actually doing. Where is this memory? Who owns it? When does it get freed? These are questions I've been ignoring my whole programming life and apparently they matter quite a lot. I'm learning. Slowly. At unreasonable hours. With the git commit messages to prove it.`,
  },
];

const TAG_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  Space:     { bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.3)", color: "#c084fc" },
  Mysteries: { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "#f472b6" },
  Aviation:  { bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.3)", color: "#818cf8" },
  Life:      { bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)",  color: "#fbbf24" },
  Tech:      { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#34d399" },
};

const ALL_TAGS = ["All", "Space", "Mysteries", "Aviation", "Life", "Tech"];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? HARDCODED_POSTS
    : HARDCODED_POSTS.filter(p => p.tag === activeTag);

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="section">
      <div style={{ marginBottom: "40px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY THOUGHTS
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Blog</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "500px" }}>
          Space theories, unsolved mysteries, aviation rabbit holes, and the chaos of learning new things at midnight.
        </p>
      </div>

      {/* Tag filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px" }}>
        {ALL_TAGS.map(tag => {
          const s = TAG_COLORS[tag];
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: "6px 16px", borderRadius: "999px", fontSize: "0.82rem",
                fontWeight: 500, cursor: "pointer", border: "none", outline: "none",
                background: isActive
                  ? (s ? `linear-gradient(135deg, ${s.color}33, ${s.color}22)` : "linear-gradient(135deg, var(--accent-lavender), var(--accent-rose))")
                  : "rgba(255,255,255,0.04)",
                color: isActive ? (s?.color ?? "white") : "var(--text-secondary)",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: isActive ? (s?.border ?? "var(--accent-lavender)") : "var(--border)",
                transition: "all 0.2s ease",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sorted.map(post => {
          const s = TAG_COLORS[post.tag] ?? TAG_COLORS["Tech"];
          return (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="glass-card"
              style={{ padding: "28px 32px", display: "block", color: "inherit", textDecoration: "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "12px" }}>
                <h2 style={{ fontSize: "1.1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.3 }}>
                  {post.title}
                </h2>
                <span style={{
                  padding: "3px 12px", borderRadius: "999px", fontSize: "0.72rem",
                  fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
                  background: s.bg, border: `1px solid ${s.border}`, color: s.color,
                }}>
                  {post.tag}
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "16px" }}>
                {post.content.slice(0, 180)}...
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", opacity: 0.6 }}>
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}