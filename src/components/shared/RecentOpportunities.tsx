import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const opportunities = [
  {
    title: "Fixed Bus Investment – Truck Series",
    price: "₦1.8m per unit",
    investors: 788,
    soldOut: true,
    image: "/ann.png", // Replace with actual image path
  },
  {
    title: "Fixed Bus Investment – Series N",
    price: "₦1.8m per unit",
    investors: 1090,
    soldOut: true,
    image: "/ann.png",
  },
  {
    title: "Fixed Bus Investment – Series O",
    price: "₦1.8m per unit",
    investors: 788,
    soldOut: true,
    image: "/ann.png",
  },
];

export default function RecentOpportunities() {
  return (
    <section className="py-20 px-6 bg-linear-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Recent Opportunities on{" "}
            <span className="text-purple-700">Annhurst GSL</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                {/* Real Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                    {opp.title}
                  </h3>

                  <div className="flex justify-between items-center mb-5 text-sm">
                    <div>
                      <p className="text-gray-500">Per Unit</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {opp.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Investors
                      </p>
                      <p className="text-2xl font-bold text-purple-700">
                        {opp.investors.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Button
                    disabled
                    className="w-full bg-pink-100 text-pink-700 hover:bg-pink-200 cursor-not-allowed font-semibold rounded-full"
                  >
                    Sold Out
                  </Button>

                  <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse shadow-lg">
                    SOLD OUT
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-lg rounded-full shadow-xl">
            Explore More Opportunities
          </Button>
        </motion.div>
      </div>
    </section>
  );
}