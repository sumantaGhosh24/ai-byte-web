import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-primary text-primary-foreground p-16 text-center">
          <h2 className="text-5xl font-bold">Start Learning Today</h2>
          <p className="mt-4 text-lg opacity-90">Join thousands of learners improving every day.</p>
          <Button size="lg" variant="secondary" className="mt-8">
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
