const categories = [
  "React",
  "Node.js",
  "TypeScript",
  "AI",
  "Machine Learning",
  "Data Science",
  "Flutter",
  "DevOps",
];

const Categories = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center">
        <h2 className="text-5xl font-bold">Explore Categories</h2>
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {categories.map((item) => (
          <div
            key={item}
            className="rounded-full border px-6 py-3 hover:bg-primary hover:text-primary-foreground transition"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
