export default function Projects() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">Projects</h1>

      <div className="mt-8 space-y-8">

        <div>
          <h2 className="text-2xl font-semibold">
            AI Resume Analyzer
          </h2>
          <p className="mt-2">
            Built an NLP-based tool that analyzes resumes and gives smart feedback.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            Image Classifier
          </h2>
          <p className="mt-2">
            Trained a deep learning model to classify images with high accuracy.
          </p>
        </div>

      </div>
    </main>
  );
}