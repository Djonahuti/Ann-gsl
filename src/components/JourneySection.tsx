import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bus, Flag, Target, ArrowDown } from "lucide-react";

const milestones = [
  {
    year: "JANUARY 2016",
    title: "First Bus Acquired",
    desc: "Annhurst acquired its first bus in January 2016 and this flagship bus operated exclusively in Lekki Phase 1.",
    icon: <Bus className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    year: "2017 - 2020",
    title: "77 Buses & Growing",
    desc: "In the following 5 years, following a change in our business model, we have travelled leaps and bounds and as at March 2021, have acquired a total of 77 buses – no buses were acquired in 2020 due to COVID.",
    desc2: "Our buses now successfully operate at capacity in Victoria Island, Lekki Phase 1, Oniru, Ajah and Epe. We are currently in the process of expanding to the Lekki Free Trade Zone, Benin and Enugu.",
    icon: <Target className="w-8 h-8" />,
    color: "bg-indigo-500",
  },
  {
    year: "MOVING FORWARD",
    title: "Intra-State Hub Vision",
    desc: "The ultimate aim of Annhurst is to run bus intra-state transportation hub services all over Nigeria, starting with Lagos.",
    desc2: "Our target is to purchase an additional 70 new buses annually.",
    icon: <Flag className="w-8 h-8" />,
    color: "bg-green-500",
    isFuture: true,
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 px-6 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">
            OUR JOURNEY
          </h2>
          <p className="text-xl text-gray-600 mt-4 font-medium">
            ANNHURST HISTORY AND OBJECTIVE
          </p>
        </motion.div>

        {/* Timeline Road */}
        <div className="relative">
          {/* Curved Road SVG Background */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg
              viewBox="0 0 1200 600"
              className="w-full h-full max-w-4xl"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M 100 150 Q 400 100, 600 200 T 1100 400"
                stroke="#e5e7eb"
                strokeWidth="80"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 100 150 Q 400 100, 600 200 T 1100 400"
                stroke="#d1d5db"
                strokeWidth="12"
                fill="none"
                strokeDasharray="20,20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Milestones */}
          <div className="relative grid md:grid-cols-3 gap-12 items-start">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
                className={`relative ${i === 2 ? "mt-32" : i === 1 ? "mt-16" : ""}`}
              >
                <Card
                  className={`p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 ${
                    m.isFuture ? "bg-linear-to-br from-green-50 to-emerald-50" : "bg-white"
                  }`}
                >
                  {/* Year Badge */}
                  <div
                    className={`absolute -top-5 left-8 ${m.color} text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2`}
                  >
                    {m.icon}
                    <span>{m.year}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                    {m.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {m.desc}
                  </p>
                  {m.desc2 && (
                    <p className="text-gray-600 mt-4 text-sm italic">
                      {m.desc2}
                    </p>
                  )}

                  {/* Future Flag */}
                  {m.isFuture && (
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute -top-20 right-0"
                    >
                      <Flag className="w-16 h-16 text-green-600 fill-green-600" />
                    </motion.div>
                  )}
                </Card>

                {/* Connector Arrow */}
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    className="hidden md:block absolute top-16 -right-12"
                  >
                    <ArrowDown className="w-24 h-24 text-gray-300 rotate-12" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Floating Dots */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 right-10"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full shadow-lg" />
          </motion.div>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="flex justify-end mt-16"
        >
          <div className="relative">
            <img
              src="/ann.png"
              alt="Annhurst Global Services Ltd"
              className="drop-shadow-2xl h-30 w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}