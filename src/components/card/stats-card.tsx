import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface StatsCardProps {
  title: string;
  value?: number | string;
  loading?: boolean;
}

const StatsCard = ({ title, value, loading }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <h2 className="text-3xl font-bold">{value?.toLocaleString()}</h2>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
