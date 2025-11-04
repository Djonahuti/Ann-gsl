export default function HeroSection() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Placeholder background - user will replace with real photo */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center" aria-hidden="true">
        <img src="/hero.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl bg-black/75 text-white p-8 md:p-10 rounded-sm shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Welcome to Annhurst GSL</h2>
          <p className="text-sm md:text-base text-white/80 mb-6">Your global solutions provider with management services expertise second to none.</p>

          <div className="flex items-center gap-4">
            <a href="/about" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold">
              Learn More
              <svg className="ml-3" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href="/contact" className="text-white/80 hover:text-white text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
