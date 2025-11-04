import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Investment() {
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
              Invest on the go.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg lg:text-xl text-gray-700 mb-10 leading-relaxed"
            >
              Invest securely and confidently on the go.
              <br />
              <span className="font-semibold text-gray-900 inline-flex items-center gap-2 mt-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Up to 25% returns, 6–12 month duration.
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
                Start Saving Today
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
              NEW
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm font-bold text-purple-700 tracking-wider mb-4"
            >
              To-Dos:
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
              {[
                "Invest with us today.",
                "Invest securely and confidently.",
                "Up to 30% returns, 18 month duration."
              ].map((text, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start text-gray-800"
                >
                  <span className="text-purple-600 mr-3 mt-1">●</span>
                  <span className={i === 2 ? "font-bold text-purple-900" : ""}>
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl shadow-md">
                Contact Us Now
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
                “You are <span className="text-purple-700 font-bold">not too young</span> or <span className="text-pink-700 font-bold">broke</span> to invest.”
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
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-300 rounded-full text-purple-700 font-medium hover:bg-purple-50 transition"
              >
                Chat with us on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}