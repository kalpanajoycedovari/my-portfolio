"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6">

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl font-bold">
          Hi, I'm Joyce 👋
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          I build AI-powered applications and machine learning systems that solve real-world problems.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/projects"
            className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            View Projects
          </a>

          <a
            href="https://github.com/dovarikalpanajoyce-coder"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            GitHub
          </a>

          <a
            href="/resume.pdf"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Resume
          </a>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-semibold">Projects</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6">

          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              AI Resume Analyzer
            </h3>
            <p className="mt-2 text-gray-600">
              Built an NLP-based resume analysis tool that improves job matching.
            </p>
          </div>

          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              Image Classifier
            </h3>
            <p className="mt-2 text-gray-600">
              Deep learning model for image classification using neural networks.
            </p>
          </div>

        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
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
      </motion.section>

    </main>
  );
}
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
  className="mb-16 text-center"
>
  <h2 className="text-3xl font-semibold">Contact</h2>

  <p className="mt-4 text-gray-600">
    Feel free to reach out for collaborations or opportunities.
  </p>

  <div className="mt-6 space-y-2">
    <p>Email: dovarikalpanajoyce@gmail.com</p>
    
    <p>
      GitHub:{" "}
      <a
        href="https://github.com/dovarikalpanajoyce-coder"
        className="text-blue-500"
      >
        github.com/dovarikalpanajoyce-coder
      </a>
    </p>
  </div>
</motion.section>