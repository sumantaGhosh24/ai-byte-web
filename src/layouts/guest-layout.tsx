import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen0">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
