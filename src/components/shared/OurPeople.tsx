import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Award, ShieldCheck } from "lucide-react";

const values = [
  {
    title: "Our People",
    desc: "Our people are made of a group of technically skilled and industrious individuals whom together contribute to making the firm a well-oiled, efficient machine.",
    icon: <Users className="w-12 h-12" />,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "High Quality Results",
    desc: "We always strive to deliver the best quality of work to our customers and we can be relied on to go the extra mile.",
    icon: <Award className="w-12 h-12" />,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Integrity",
    desc: "Above all else we act with integrity and can be relied on to always put our clients' needs first.",
    icon: <ShieldCheck className="w-12 h-12" />,
    gradient: "from-green-500 to-emerald-600",
  },
];

export default function OurPeople() {
  return (
    <section className="py-24 px-6 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Image Stack */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Image 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-linear-to-br from-blue-100 to-indigo-100 h-64 flex items-center justify-center">
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-32 h-32" />
            </div>
          </motion.div>

          {/* Image 2 & 3 Stacked */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-linear-to-tr from-purple-100 to-pink-100 h-56 flex items-center justify-center">
                <div className="bg-gray-300 border-2 border-dashed rounded-xl w-24 h-24" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-linear-to-bl from-green-100 to-emerald-100 h-56 flex items-center justify-center">
                <div className="bg-gray-300 border-2 border-dashed rounded-xl w-24 h-24" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Values */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
                <div className="flex gap-6 items-start">
                  <div className={`p-4 rounded-2xl bg-linear-to-r ${val.gradient} text-white shadow-lg`}>
                    {val.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {val.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}