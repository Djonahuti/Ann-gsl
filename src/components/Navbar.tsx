import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>('home');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const ids = ['home', 'investments', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className={isSticky ? "sticky top-0 left-0 right-0 z-50" : "absolute top-0 left-0 right-0 z-50"}>
      <nav className={
        isSticky
          ? "mx-auto px-6 py-5 flex items-center justify-between bg-white text-gray-900 shadow transition-colors duration-300"
          : "mx-auto px-6 py-5 flex items-center justify-between text-white backdrop-blur-sm bg-black/20"
      }>
        <div className="flex items-center gap-4">
          <img src={isSticky ? "/ann.png" : "/logo.png"} alt="Annhurst GSL" className="h-10 w-auto transition-all duration-300" />
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li>
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className={active === 'home' ? 'text-red-600' : isSticky ? 'text-gray-900/90 hover:text-red-600' : 'text-white/90 hover:text-white'}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToId('investments')}
              className={active === 'investments' ? 'text-red-600' : isSticky ? 'text-gray-900/80 hover:text-red-600' : 'text-white/80 hover:text-white'}
            >
              Investments
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToId('about')}
              className={active === 'about' ? 'text-red-600' : isSticky ? 'text-gray-900/80 hover:text-red-600' : 'text-white/80 hover:text-white'}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className={active === 'contact' ? 'text-red-600 font-semibold' : isSticky ? 'text-gray-900 font-semibold hover:text-red-600' : 'text-white font-semibold hover:underline'}
            >
              Contact Us
            </button>
          </li>
          <li>
            <a href="https://annhurst-ts.com" className={isSticky ? "text-gray-900/80 hover:text-red-600" : "text-white/80 hover:text-white"}>Annhurst Transport</a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={isSticky ? "md:hidden p-2 rounded-md text-gray-900/90 focus:outline-none focus:ring-2 focus:ring-red-600/50" : "md:hidden p-2 rounded-md text-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className={isSticky ? "absolute top-full left-0 right-0 bg-white text-gray-900 p-6 space-y-4 shadow-lg" : "absolute top-full left-0 right-0 bg-black/90 text-white p-6 space-y-4 shadow-lg"}>
          <button onClick={() => { scrollToId('home'); setOpen(false) }} className="block text-lg font-medium">Home</button>
          <a href="https://annhurst-ts.com" onClick={() => setOpen(false)} className="block text-lg font-medium">Annhurst Transport</a>
          <button onClick={() => { scrollToId('investments'); setOpen(false) }} className="block text-lg font-medium">Investments</button>
          <button onClick={() => { scrollToId('about'); setOpen(false) }} className="block text-lg font-medium">About Us</button>
          <button onClick={() => { scrollToId('contact'); setOpen(false) }} className="block text-lg font-semibold">Contact Us</button>
        </div>
      </div>
    </header>
  );
}
