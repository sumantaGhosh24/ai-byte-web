const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">AIByte admin analytics overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">Total Users</h2>

          <p className="mt-2 text-4xl font-bold">12,450</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">Courses</h2>

          <p className="mt-2 text-4xl font-bold">324</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">Quiz Attempts</h2>

          <p className="mt-2 text-4xl font-bold">89K</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">Active Streaks</h2>

          <p className="mt-2 text-4xl font-bold">2,312</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
