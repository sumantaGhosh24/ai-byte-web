import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
