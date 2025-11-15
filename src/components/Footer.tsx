import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconArrowRight, IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";

type SettingsData = {
  logo: string;
  logo_blk: string;
  footer_write: string;
  footer_head: string;
  footer_head2: string;
  phone: string[];
  email: string[];
  address: string;
  bottom_left: string;
  bottom_right: string[];
};

type ApiResponse = {
  status: "success" | "error";
  data?: SettingsData;
  message?: string;
};

export default function Footer() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subMessage, setSubMessage] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings.php');
        if (!res.ok) throw new Error('Failed to load settings');

        const json: ApiResponse = await res.json();
        if (json.status === 'success' && json.data) {
          setSettings(json.data);
        } else {
          throw new Error(json.message || 'Invalid response');
        }
      } catch (err) {
        console.error('Footer settings error:', err);
        setError('Failed to load footer data');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !/\S+@\S+\.\S+/.test(subscriberEmail)) {
      setSubStatus("error");
      setSubMessage("Please enter a valid email");
      return;
    }

    setSubStatus("loading");
    setSubMessage("");

    try {
      const res = await fetch('/api/subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriberEmail })
      });

      const data = await res.json();

      if (data.status === 'success') {
        setSubStatus("success");
        setSubMessage(data.message);
        setSubscriberEmail(""); // Clear input
      } else {
        setSubStatus("error");
        setSubMessage(data.message);
      }
    } catch (err) {
        setSubStatus("error");
        setSubMessage("Network error. Try again.");
    }
  };

  if (loading) {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          Loading footer...
        </div>
      </footer>
    );
  }

  if (error || !settings) {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-red-400">
          {error || 'Footer data unavailable'}
        </div>
      </footer>
    );
  }

  const phone = settings.phone[0] || '+234 707 857 1856';
  const email = settings.email[0] || 'customerservices@annhurst-gsl.com';
  const addressLines = settings.address.split('\n');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={settings.logo}
                alt="Annhurst Global Services Ltd"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-white">ANNHURST</h3>
                <p className="text-xs text-gray-500">Global Services Ltd</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {settings.footer_write}
            </p>
            <p className="text-sm leading-relaxed max-w-xs">
              {settings.footer_head2}
            </p>
          <div className="flex justify-item-between space-x-3">
            <a
             href="https://x.com/i/flow/login?redirect_after_login=%2FAnnhurstGSL" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-linear-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandX stroke={2} className='h-5 w-5 text-white relative z-10' />
              </p>
            </a>

            <a
             href="https://web.facebook.com/people/Annhurst-Global-Services/100068235036574/?_rdc=1&_rdr#" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-linear-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandFacebook className='h-5 w-5 text-white relative z-10' />
              </p>
            </a>

            <a
             href="https://www.instagram.com/annhurst_transport_services/" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-linear-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandInstagram stroke={2} className='h-5 w-5 text-white relative z-10' />
              </p>
            </a>

            <a
             href="https://annhurst-ts.com" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-gray-200 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-30/50'>

                <Avatar className='h-8 w-8 relative z-10'>
                  <AvatarImage src="/ats.png" alt="logo" />
                </Avatar>
              </p>
            </a>
          </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {settings.footer_head}
            </h4>
            <ul className="space-y-2">
              {["Home", "Our Services", "Investment Opportunities", "About Us", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span>{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <div className="leading-tight">
                  {addressLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-9 pt-8 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-6 max-w-3xl mx-auto mb-2 shimmer-effect">
            <form onSubmit={handleSubscribe} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h5 className="text-lg font-semibold text-white mb-1">
                  Stay Updated
                </h5>
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter for the latest investment
                  opportunities and company updates.
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  disabled={subStatus === "loading" || subStatus === "success"}
                  placeholder="Enter your email address"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
                />
                <Button
                 type="submit" 
                 disabled={subStatus === "loading" || subStatus === "success"} 
                 className="bg-red-600 hover:bg-red-700 text-white px-6 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50"
                >
                  {subStatus === "loading" ? "..." : "Subscribe"} <span className="ml-1"><IconArrowRight /></span>
                </Button>
              </div>
              {subMessage && (
                <p className={`text-sm mt-1 ${subStatus === "success" ? "text-green-400" : "text-red-400"}`}>
                  {subMessage}
                </p>
              )}              
            </form>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-gray-500 pt-8 border-t border-gray-700">
              <p>© {new Date().getFullYear()} {settings.bottom_left}</p>
              <div className="flex items-center space-x-2">
                  <span>Powered by</span>
                  <a href="#" className="text-red-500 hover:underline">UT Express</a>
              </div>
          </div>          
        </div>
      </div>
    </footer>
  );
}