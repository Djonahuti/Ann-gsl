import { useEffect, useState } from "react";

type PageData = {
  hero_banner: string;
  hero_big_text: string;
  hero_small: string;
  hero_primary_button: string;
  hero_secondary_button: string;
  // Add other fields as needed
};

type ApiResponse = {
  status: "success" | "error";
  data?: PageData;
  message?: string;
};

export default function HeroSection() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch('/api/page.php');
        if (!res.ok) throw new Error('Failed to fetch page data');

        const json: ApiResponse = await res.json();
        if (json.status === 'success' && json.data) {
          setPageData(json.data);
        } else {
          throw new Error(json.message || 'Invalid response');
        }
      } catch (err) {
        console.error('HeroSection error:', err);
        setError('Failed to load hero content');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading || error || !pageData) {
    return (
      <section className="relative w-full h-[520px] overflow-hidden bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {loading ? 'Loading...' : error || 'Content unavailable'}
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Placeholder background - user will replace with real photo */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {/* background image with slight blur and dimming */}
        <img
          src={pageData.hero_banner}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75"
          onError={(e) => { e.currentTarget.src = "/hero.jpg"; }}
        />
        {/* subtle gray tint overlay */}
        <div className="absolute inset-0 bg-gray-300/12" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl bg-black/75 text-white p-8 md:p-10 rounded-sm shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">{pageData.hero_big_text}</h2>
          <p className="text-sm md:text-base text-white/80 mb-6">{pageData.hero_small}</p>

          <div className="flex items-center gap-4">
            <button
             type="button"
              onClick={() => {
                const el = document.getElementById('investments')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  // fallback to route if section id is not present
                  window.location.href = '/'
                }
              }}             
             className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
            >
              {pageData.hero_primary_button}
              <svg className="ml-3" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  // fallback to route if section id is not present
                  window.location.href = '/contact'
                }
              }}
              className="text-white/80 hover:text-white text-sm"
            >
              {pageData.hero_secondary_button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
