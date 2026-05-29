import { Brain, Trophy, Flame, Bell, BookOpen, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Get personalized course recommendations every day.",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description: "Unlock badges and achievements while learning.",
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    description: "Build habits and maintain learning consistency.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive reminders at your preferred time.",
  },
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description: "Learn through structured lessons and quizzes.",
  },
  {
    icon: Sparkles,
    title: "Gamified XP",
    description: "Earn XP and level up as you progress.",
  },
];

const Features = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center">
        <h2 className="text-5xl font-bold">Everything You Need</h2>
        <p className="mt-4 text-muted-foreground">Modern learning tools designed for engagement.</p>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="rounded-3xl border p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
