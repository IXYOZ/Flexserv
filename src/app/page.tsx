"use client";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Floating background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Welcome to Flexserv
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          A demo project showcasing{" "}
          <span className="font-semibold">full-stack development</span> with
          modern tools. Explore authentication, routing, and UI integration in a
          clean workflow.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/login"
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow-lg hover:scale-105 hover:bg-blue-700 hover:shadow-xl transition-all"
          >
            Get Started
          </a>
          <a
            href="https://github.com/yourusername/flexserv"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md text-gray-800 font-medium shadow-lg hover:scale-105 hover:bg-gray-100 hover:shadow-xl transition-all"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 py-16">
        {[
          {
            title: "🔑 Authentication",
            desc: "Role-based login with mock users. Demonstrates secure flows and session handling.",
          },
          {
            title: "📦 Listings & Items",
            desc: "Manage items and listings with dynamic data, built for scalability and flexibility.",
          },
          {
            title: "🎨 Tailwind UI",
            desc: "Responsive, modern UI with gradients, glass effects, and smooth transitions.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 bg-white transition-all"
          >
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Demo Accounts Section */}
      <section className="px-6 md:px-20 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">
          All user can go every role 🚀
        </h2>
      </section>

      {/* Call To Action */}
      <section className="py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to explore Flexserv in action?
        </h2>
        <p className="text-gray-600 mb-6">
          Try logging in with the demo accounts above and experience the
          features.
        </p>
        <a
          href="/login"
          className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg hover:scale-110 hover:bg-indigo-700 transition-all"
        >
          Login Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        🚀 Built with Next.js + React + Tailwind CSS
      </footer>
    </main>
  );
}
