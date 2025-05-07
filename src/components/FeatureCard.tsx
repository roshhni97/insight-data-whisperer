
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="border hover:border-insight-primary/50 hover:shadow-md transition-all duration-200">
      <CardContent className="pt-6">
        <div className="mb-4 w-12 h-12 rounded-lg bg-insight-light flex items-center justify-center">
          <Icon className="text-insight-primary" size={24} />
        </div>
        <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
