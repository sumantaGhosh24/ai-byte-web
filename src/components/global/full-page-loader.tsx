const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-sm text-muted-foreground">Loading AIByte Admin...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
