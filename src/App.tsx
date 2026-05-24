import { Routes, Route } from "react-router-dom";

import LandingLayout from "./layouts/guest-layout";
import AdminLayout from "./layouts/admin-layout";
import LandingPage from "./pages/landing";
import SignInPage from "./pages/sign-in";
import PublicGuard from "./routes/public-guard";
import AdminGuard from "./routes/admin-guard";
import DashboardPage from "./pages/dashboard";
import UsersPage from "./pages/users";
import CategoriesPage from "./pages/categories";
import CreateCategoryPage from "./pages/create-category";
import UpdateCategoryPage from "./pages/update-category";
import UnauthorizedPage from "./pages/unauthorized";
import UserGuard from "./routes/user-guard";
import NotFoundPage from "./pages/not-found";
import ProfileDetails from "./pages/profile-details";

function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign-in"
          element={
            <PublicGuard>
              <SignInPage />
            </PublicGuard>
          }
        />
      </Route>
      <Route element={<AdminLayout />}>
        <Route
          path="/dashboard"
          element={
            <AdminGuard>
              <DashboardPage />
            </AdminGuard>
          }
        />
        <Route
          path="/users"
          element={
            <AdminGuard>
              <UsersPage />
            </AdminGuard>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <AdminGuard>
              <ProfileDetails />
            </AdminGuard>
          }
        />
        <Route
          path="/categories"
          element={
            <AdminGuard>
              <CategoriesPage />
            </AdminGuard>
          }
        />
        <Route
          path="/categories/create"
          element={
            <AdminGuard>
              <CreateCategoryPage />
            </AdminGuard>
          }
        />
        <Route
          path="/categories/:id/edit"
          element={
            <AdminGuard>
              <UpdateCategoryPage />
            </AdminGuard>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <UserGuard>
              <UnauthorizedPage />
            </UserGuard>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
