import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Truck, Briefcase } from "lucide-react";

export default function AccessOpportunities() {
  return (
    <section className="py-24 px-6 bg-linear-to-r from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Access investment
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
              opportunities
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Invest securely and confidently on the go. Grow your money 
            confidently by investing in pre-vetted investment opportunities.
          </p>

          <motion.a
            href="/investments"
            whileHover={{ x: 8 }}
            className="inline-flex items-center gap-3 text-purple-600 font-bold text-lg hover:text-purple-700 transition"
          >
            Learn more about Investments
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Right: Callout Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Card className="p-10 shadow-2xl bg-white/90 backdrop-blur-lg border border-purple-100 hover:shadow-3xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Text:
            </h3>

            <div className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <Truck className="w-10 h-10 text-orange-500 flex shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Are you an experienced driver looking to own your own bus?
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                <Briefcase className="w-10 h-10 text-purple-600 flex shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Are you a business owner that needs a vehicle to move your goods?
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
              className="bg-linear-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8"
            >
              <p className="text-lg font-bold text-gray-900 text-center">
                Try our Hire Purchase Agreements today
                <br />
                <span className="text-3xl text-purple-700">
                  and pay as little as ₦65,000 weekly!
                </span>
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
             className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-7 rounded-xl shadow-lg"
              >
                Contact Us Now!
              </Button>
            </motion.div>

            {/* Floating Checkmarks */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="absolute -z-10"
                style={{
                  top: `${20 + i * 25}%`,
                  right: -20,
                  transform: "translateX(100%)"
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}