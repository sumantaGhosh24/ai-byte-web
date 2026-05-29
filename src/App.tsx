import { Routes, Route } from "react-router-dom";

import LandingLayout from "./layouts/guest-layout";
import AdminLayout from "./layouts/admin-layout";
import PublicGuard from "./routes/public-guard";
import AdminGuard from "./routes/admin-guard";
import UserGuard from "./routes/user-guard";
import {
  AchievementsPage,
  CategoriesPage,
  CourseDetailsPage,
  CoursesPage,
  CreateAchievementPage,
  CreateCategoryPage,
  CreateCoursePage,
  CreateLessonPage,
  CreateQuizPage,
  DashboardPage,
  FixLessonsOrderPage,
  GenerateAICoursePage,
  GenerateAILessonPage,
  GenerateAIQuizPage,
  LandingPage,
  LessonDetailsPage,
  NotFoundPage,
  ProfileDetails,
  QuizDetailsPage,
  SignInPage,
  UnauthorizedPage,
  UpdateAchievementPage,
  UpdateCategoryPage,
  UpdateCoursePage,
  UpdateLessonPage,
  UpdateQuizPage,
  UsersPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route
          path="/"
          element={
            <PublicGuard>
              <LandingPage />
            </PublicGuard>
          }
        />
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
          path="/lessons/create/:id"
          element={
            <AdminGuard>
              <CreateLessonPage />
            </AdminGuard>
          }
        />
        <Route
          path="/lessons/generate/:id"
          element={
            <AdminGuard>
              <GenerateAILessonPage />
            </AdminGuard>
          }
        />
        <Route
          path="/lessons/:id/edit"
          element={
            <AdminGuard>
              <UpdateLessonPage />
            </AdminGuard>
          }
        />
        <Route
          path="/lesson/:id/fix"
          element={
            <AdminGuard>
              <FixLessonsOrderPage />
            </AdminGuard>
          }
        />
        <Route
          path="/lesson/:id"
          element={
            <AdminGuard>
              <LessonDetailsPage />
            </AdminGuard>
          }
        />
        <Route
          path="/quizzes/create/:id"
          element={
            <AdminGuard>
              <CreateQuizPage />
            </AdminGuard>
          }
        />
        <Route
          path="/quizzes/generate/:id"
          element={
            <AdminGuard>
              <GenerateAIQuizPage />
            </AdminGuard>
          }
        />
        <Route
          path="/quizzes/:id/edit"
          element={
            <AdminGuard>
              <UpdateQuizPage />
            </AdminGuard>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <AdminGuard>
              <QuizDetailsPage />
            </AdminGuard>
          }
        />
        <Route
          path="/achievements"
          element={
            <AdminGuard>
              <AchievementsPage />
            </AdminGuard>
          }
        />
        <Route
          path="/achievements/create"
          element={
            <AdminGuard>
              <CreateAchievementPage />
            </AdminGuard>
          }
        />
        <Route
          path="/achievements/:id/edit"
          element={
            <AdminGuard>
              <UpdateAchievementPage />
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
