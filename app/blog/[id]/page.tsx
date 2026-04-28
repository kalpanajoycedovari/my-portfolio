"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";

type Post = { id: string; title: string; content: string; date: string; tag: string };

const TAG_COLORS: Record<string, string> = {
  Space: "#c084fc", Mysteries: "#f472b6", Aviation: "#818cf8", Life: "#fbbf24", Tech: "#34d399",
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
  {
    id: "1744000007",
    title: "Day One: NDA Signed, Name Forgotten, Absolutely Thriving",
    tag: "Life",
    date: "2025-04-10T09:00:00.000Z",
    content: `I don't know what I expected my first day as a Data Analyst intern to feel like. Something cinematic, maybe. Walking in with purpose. Knowing things.

What actually happened: I stood outside the Levitica Technologies office for a full two minutes before walking in because I wasn't sure if I was supposed to knock.

The morning was a blur of introductions. I shook hands with people whose names I immediately lost. I smiled and nodded and said "yeah, really looking forward to it" approximately eleven times. My manager sat me down for a one-on-one that was warm and professional and I retained maybe 60% of it because 40% of my brain was busy reminding me to maintain eye contact but not too much eye contact.

Then came the NDAs. Plural. I signed documents promising not to discuss data I hadn't even seen yet. Which felt both very serious and slightly funny — like being sworn to secrecy about a secret you're not allowed to know yet.

Because that was the other thing: clearance. The actual data documents, the dashboards, the pipelines — all pending access approval. So my first day as a Data Analyst involved no data. I sat with my new laptop, met the two other interns (both lovely, both equally lost), and waited.

There's a specific kind of excitement that lives right next to fear and you can't always tell them apart. That's what day one felt like. I was absolutely terrified and completely thrilled and I had nowhere to put either feeling so I just kept smiling and drinking the office coffee like a person who had everything under control.

I did not have everything under control. But I showed up. And apparently that's most of it.`,
  },
];

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const hardcoded = HARDCODED_POSTS.find(p => p.id === id);
    if (hardcoded) { setPost(hardcoded); return; }
    const stored = localStorage.getItem("blog_posts");
    if (stored) {
      const posts: Post[] = JSON.parse(stored);
      setPost(posts.find(p => p.id === id) || null);
    }
  }, [id]);

  if (!post) return (
    <div className="section" style={{ paddingTop: "80px" }}>
      <p style={{ color: "var(--text-secondary)" }}>Post not found.</p>
      <Link href="/blog" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>← Back to blog</Link>
    </div>
  );

  const accentColor = TAG_COLORS[post.tag] ?? "#c084fc";

  return (
    <div className="section" style={{ maxWidth: "680px" }}>
      <Link href="/blog" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", display: "inline-block", marginBottom: "32px" }}>
        ← Back to blog
      </Link>

      <div style={{ marginBottom: "32px" }}>
        <span style={{
          display: "inline-block", padding: "4px 14px", borderRadius: "999px",
          fontSize: "0.75rem", fontWeight: 500, marginBottom: "16px",
          background: accentColor + "18", border: `1px solid ${accentColor}44`, color: accentColor,
        }}>
          {post.tag}
        </span>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.2, marginBottom: "12px" }}>
          {post.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", opacity: 0.7 }}>
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.95 }}>
        {post.content.split("\n\n").map((para, i) => (
          <p key={i} style={{ marginBottom: "20px" }}>{para}</p>
        ))}
      </div>
    </div>
  );
}