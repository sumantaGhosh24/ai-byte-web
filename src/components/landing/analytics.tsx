import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Analytics = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">Track Your Growth</h2>
          <p className="mt-4 text-muted-foreground">Detailed analytics and progress tracking.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total XP</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-5xl font-bold">12,540</h3>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Level</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-5xl font-bold">14</h3>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-5xl font-bold">48 Days</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
