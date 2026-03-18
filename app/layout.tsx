export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <nav className="flex justify-between items-center p-6 max-w-5xl mx-auto">
          <h1 className="font-bold text-xl">Joyce</h1>

          <div className="flex gap-6">
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
          </div>
        </nav>

        {children}

      </body>
    </html>
  );
}