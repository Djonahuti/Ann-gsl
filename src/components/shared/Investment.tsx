import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type PageData = {
  inv2_l_big: string;
  inv2_l_small: string;
  inv2_l_md: string;
  inv2_l_cta: string;
  inv2_r_badge: string;
  inv2_r_list: string[]; // JSON decoded
  inv2_r_active: string;
  inv2_r_cta: string;
  inv2_r_btext: string;
  inv2_r_ptext: string;
  inv2_r_btext2: string;
  inv2_r_rtext: string;
  inv2_r_btext3: string;
  inv2_r_wcta: string;
  inv2_r_wnum: string;
};

type ApiResponse = {
  status: "success" | "error";
  data?: PageData;
  message?: string;
};

export default function Investment() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page.php");
        if (!res.ok) throw new Error("Failed to load content");

        const json: ApiResponse = await res.json();
        if (json.status === "success" && json.data) {
          setData(json.data);
        } else {
          throw new Error(json.message || "Invalid response");
        }
      } catch (err) {
        console.error("Investment section error:", err);
        setError("Failed to load investment content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ───── Loading ─────
  if (loading) {
    return (
      <section className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-purple-200 rounded w-64 mb-4"></div>
            <div className="h-8 bg-purple-100 rounded w-48"></div>
          </div>
        </div>
      </section>
    );
  }

  // ───── Error ─────
  if (error || !data) {
    return (
      <section className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center text-red-600 font-medium">{error || "Content unavailable"}</div>
      </section>
    );
  }

  // ───── Render ─────  
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 flex items-center justify-center p-6 overflow-hidden">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Hero Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="p-10 lg:p-14 shadow-2xl border-0 bg-white/95 backdrop-blur">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {data.inv2_l_big}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg lg:text-xl text-gray-700 mb-10 leading-relaxed"
            >
              {data.inv2_l_small}
              <br />
              <span className="font-semibold text-gray-900 inline-flex items-center gap-2 mt-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {data.inv2_l_md}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {data.inv2_l_cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Right: Floating Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <Card className="p-8 shadow-2xl bg-white border border-purple-100 max-w-sm mx-auto hover:shadow-3xl transition-shadow">
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -top-4 -right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              {data.inv2_r_badge}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm font-bold text-purple-700 tracking-wider mb-4"
            >
              {data.inv2_r_active}
            </motion.h3>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="space-y-4 mb-8"
            >
              {data.inv2_r_list.map((item, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start text-gray-800"
                >
                  <span className="text-purple-600 mr-3 mt-1">●</span>
                  <span className={i === data.inv2_r_list.length - 1 ? "font-bold text-purple-900" : ""}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
               onClick={() => {
                const el = document.getElementById('contact')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  // fallback to route if section id is not present
                  window.location.href = '/'
                }
              }}
               className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl shadow-md"
              >
                {data.inv2_r_cta}
              </Button>
            </motion.div>

            {/* Quote Bubble */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-10 p-6 bg-linear-to-r from-purple-50 to-pink-50 rounded-3xl border border-purple-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
              <p className="relative text-lg italic text-center font-medium text-gray-800 leading-relaxed">
                {data.inv2_r_btext} <span className="text-purple-700 font-bold">{data.inv2_r_ptext}</span>{data.inv2_r_btext2}<span className="text-pink-700 font-bold">{data.inv2_r_rtext}</span> {data.inv2_r_btext3}
              </p>
            </motion.div>

            {/* Contact Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-center"
            >
              <a
                href={`https://wa.me/${data.inv2_r_wnum.replace(/[^0-9]/g, "")}?text=I%27d%20like%20to%20know%20more%20about%20your%20investment%20opportunities.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-300 rounded-full text-purple-700 font-medium hover:bg-purple-50 transition"
              >
                {data.inv2_r_wcta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}