import { Routes, Route } from "react-router-dom";

import LandingLayout from "./layouts/guest-layout";
import AdminLayout from "./layouts/admin-layout";
import PublicGuard from "./routes/public-guard";
import AdminGuard from "./routes/admin-guard";
import UserGuard from "./routes/user-guard";
import {
  CategoriesPage,
  CourseDetailsPage,
  CoursesPage,
  CreateCategoryPage,
  CreateCoursePage,
  DashboardPage,
  GenerateAICoursePage,
  LandingPage,
  NotFoundPage,
  ProfileDetails,
  SignInPage,
  UnauthorizedPage,
  UpdateCategoryPage,
  UpdateCoursePage,
  UsersPage,
} from "./pages";

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
          path="/courses"
          element={
            <AdminGuard>
              <CoursesPage />
            </AdminGuard>
          }
        />
        <Route
          path="/courses/create"
          element={
            <AdminGuard>
              <CreateCoursePage />
            </AdminGuard>
          }
        />
        <Route
          path="/courses/generate"
          element={
            <AdminGuard>
              <GenerateAICoursePage />
            </AdminGuard>
          }
        />
        <Route
          path="/courses/:id/edit"
          element={
            <AdminGuard>
              <UpdateCoursePage />
            </AdminGuard>
          }
        />
        <Route
          path="/course/:id"
          element={
            <AdminGuard>
              <CourseDetailsPage />
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
