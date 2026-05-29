const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img
                  src="/favicon-32x32.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="size-4"
                />
              </div>
              <span className="text-lg font-bold">AIByte</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered learning platform helping learners stay consistent and motivated.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Courses</li>
              <li>Achievements</li>
              <li>XP System</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AIByte. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
