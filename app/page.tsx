export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6">

      {/* HERO SECTION */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold">
          Hi, I'm Joyce!
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          I build AI-powered applications and machine learning projects.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/projects"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            View Projects
          </a>

          <a
            href="https://github.com/dovarikalpanajoyce-coder"
            className="border px-6 py-3 rounded-lg"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold">Projects</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6">

          {/* Project 1 */}
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              AI Resume Analyzer
            </h3>
            <p className="mt-2 text-gray-600">
              Built an NLP-based resume analysis tool that gives feedback and improves job matching.
            </p>
            <a
              href="https://github.com/dovarikalpanajoyce-coder"
              className="text-blue-500 mt-2 inline-block"
            >
              View Code →
            </a>
          </div>

          {/* Project 2 */}
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              Image Classifier
            </h3>
            <p className="mt-2 text-gray-600">
              Deep learning model that classifies images using neural networks.
            </p>
            <a
              href="https://github.com/dovarikalpanajoyce-coder"
              className="text-blue-500 mt-2 inline-block"
            >
              View Code →
            </a>
          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold">Skills</h2>

        <div className="mt-6 flex flex-wrap gap-3">

          <span className="px-4 py-2 bg-gray-200 rounded-full">Python</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">Machine Learning</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">Deep Learning</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">NLP</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">TensorFlow</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">PyTorch</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">React</span>
          <span className="px-4 py-2 bg-gray-200 rounded-full">Next.js</span>

        </div>
      </section>

    </main>
  );
}