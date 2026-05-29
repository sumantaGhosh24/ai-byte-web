import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "The XP and achievement system keeps me motivated every day.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    content: "The AI recommendations helped me discover courses perfectly matched to my goals.",
  },
  {
    name: "Emily Davis",
    role: "Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "My learning streak is now over 90 days. The reminders are incredibly useful.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-muted/30 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Loved by Learners</h2>
          <p className="mt-4 text-muted-foreground">Thousands of users learn smarter every day.</p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border bg-background p-8">
              <p className="leading-relaxed text-muted-foreground">"{item.content}"</p>
              <div className="mt-6 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
