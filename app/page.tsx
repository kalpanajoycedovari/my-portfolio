export default function Home() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold">
        Hi, I'm Joyce!
      </h1>

      <p className="mt-6 text-xl">
        I build AI-powered applications and machine learning projects.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          View Projects
        </a>

        <a
          href="https://github.com/dovarikalpanajoyce-coder"
          className="px-6 py-3 border rounded-xl"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}