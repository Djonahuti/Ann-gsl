import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Investment from "./shared/Investment";
import RecentOpportunities from "./shared/RecentOpportunities";
import AccessOpportunities from "./shared/AccessOportunities";

export default function InvestmentSection() {
  const investments = [
    { title: "Fixed Bus Investment – Series O", price: "N1.8m per unit", status: "Investment closed" },
    { title: "Fixed Bus Investment – Series M", price: "N1.8m per unit", status: "Investment closed" },
  ];

  return (
    <div className="py-16 text-center">
      <AccessOpportunities />      
      <Investment />
      <RecentOpportunities />    
      <section className="bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">
          Recent Investment Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {investments.map((item, idx) => (
            <Card key={idx} className="shadow-md border-none">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{item.price}</p>
                <p className="text-red-600 font-semibold">{item.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
