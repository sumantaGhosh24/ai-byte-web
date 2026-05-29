import { Trophy, Flame, Star, Medal, Target, Zap } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Course Master",
    description: "Complete 10 courses",
  },
  {
    icon: Flame,
    title: "30 Day Streak",
    description: "Learn for 30 days straight",
  },
  {
    icon: Star,
    title: "Quiz Expert",
    description: "Score above 90%",
  },
  {
    icon: Medal,
    title: "Top Learner",
    description: "Reach level 20",
  },
  {
    icon: Target,
    title: "Focused Learner",
    description: "Complete 100 lessons",
  },
  {
    icon: Zap,
    title: "XP Collector",
    description: "Earn 10,000 XP",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="container mx-auto px-6 py-24">
      <div className="text-center">
        <h2 className="text-5xl font-bold">Unlock Achievements</h2>
        <p className="mt-4 text-muted-foreground">
          Stay motivated with badges, streaks and XP rewards.
        </p>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
