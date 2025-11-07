import Investment from "./shared/Investment";
import RecentOpportunities from "./shared/RecentOpportunities";
import AccessOpportunities from "./shared/AccessOportunities";

export default function InvestmentSection() {

  return (
    <div className="py-16 text-center">
      <AccessOpportunities />      
      <Investment />
      <RecentOpportunities />
    </div>
  );
}
