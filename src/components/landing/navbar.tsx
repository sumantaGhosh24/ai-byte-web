import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <img src="/favicon-32x32.png" alt="logo" height={40} width={40} className="size-4" />
          </div>
          <span className="text-lg font-bold">AIByte</span>
        </div>
        <nav className="hidden gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#achievements"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Achievements
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Reviews
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:flex">
            Login
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
