import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

type Opportunity = {
  title: string;
  price: string;
  investors: number;
  image: string;
  soldOut: boolean;
};

type ApiResponse = {
  status: "success" | "error";
  data?: Opportunity[];
  message?: string;
};

export default function RecentOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch('/api/recent-investments.php');
        if (!res.ok) throw new Error('Failed to fetch');

        const json: ApiResponse = await res.json();
        if (json.status === 'success' && json.data) {
          setOpportunities(json.data);
        } else {
          throw new Error(json.message || 'Invalid response');
        }
      } catch (err) {
        console.error('RecentOpportunities error:', err);
        setError('Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="py-20 px-6 bg-linear-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-purple-200 rounded w-64 mx-auto mb-4"></div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/50 backdrop-blur rounded-xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 px-6 bg-linear-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </section>
    );
  }

  // Empty State
  if (opportunities.length === 0) {
    return (
      <section className="py-20 px-6 bg-linear-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">No recent opportunities available.</p>
        </div>
      </section>
    );
  }

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
              key={opp.title + index}
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
                    onError={(e) => {
                      e.currentTarget.src = "/ann.png"; // fallback
                    }}                    
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
                    disabled={opp.soldOut}
                    className={`w-full font-semibold rounded-full transition-all ${
                      opp.soldOut
                        ? "bg-pink-100 text-pink-700 hover:bg-pink-200 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {opp.soldOut ? "Sold Out" : "Invest Now"}
                  </Button>

                  {opp.soldOut && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse shadow-lg">
                      SOLD OUT
                    </Badge>
                  )}
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