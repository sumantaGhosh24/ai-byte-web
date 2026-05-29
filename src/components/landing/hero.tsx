import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-32">
        <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm mb-6">
          🚀 AI Powered Learning Platform
        </div>
        <h1 className="text-6xl font-bold tracking-tight">
          Learn Faster.
          <span className="text-primary"> Earn XP. </span>
          Stay Consistent.
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Master new skills through AI-powered courses, quizzes, achievements, streaks and
          personalized learning recommendations.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        <div className="mt-10 flex gap-10">
          <div>
            <h3 className="text-3xl font-bold">20K+</h3>
            <p className="text-muted-foreground">Active Learners</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-muted-foreground">Courses</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1M+</h3>
            <p className="text-muted-foreground">Lessons Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
