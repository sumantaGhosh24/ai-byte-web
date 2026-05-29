import { useParams } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  Bell,
  Bookmark,
  BookOpen,
  Brain,
  CheckCircle2,
  Flame,
  GraduationCap,
  Shield,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { useUser } from "@/hooks/use-profile";
import { useUserAchievements } from "@/hooks/use-achievements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProfileSkeleton from "@/components/skeleton/profile-skeleton";
import AchievementBadge from "@/components/badge/achievement-card-user";

const ProfileDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, error } = useUser(id);

  const {
    data: achievements,
    isLoading: isAchievementLoading,
    isFetching: isAchievementFetching,
    isError: isAchievementError,
    error: achievementError,
  } = useUserAchievements(id);

  const userData = data?.user;

  const user = userData?.user;

  const stats = userData?.stats;

  const xp = userData?.xp;

  const level = Math.floor(xp?.totalXP / 1000) + 1;

  const currentLevelXP = xp?.totalXP % 1000;

  const nextLevelXP = 1000;

  const xpProgress = (currentLevelXP / nextLevelXP) * 100;

  const statCards = [
    {
      title: "Enrollments",
      value: stats?.enrollsCount,
      icon: BookOpen,
      description: "Courses enrolled",
    },
    {
      title: "Progress",
      value: stats?.progressCount,
      icon: BookOpen,
      description: "Lesson progress",
    },
    {
      title: "Completed Courses",
      value: stats?.finishedCoursesCount,
      icon: GraduationCap,
      description: "Courses completed",
    },
    {
      title: "Completed Lessons",
      value: stats?.finishedLessonsCount,
      icon: CheckCircle2,
      description: "Lessons finished",
    },
    {
      title: "Quiz Attempts",
      value: stats?.totalQuizAttempts,
      icon: Brain,
      description: "Quiz attempts",
    },
    {
      title: "Bookmarks",
      value: stats?.totalBookmarks,
      icon: Bookmark,
      description: "Saved content",
    },
    {
      title: "Achievements",
      value: stats?.achievementsCount,
      icon: Trophy,
      description: "Unlocked achievements",
    },
    {
      title: "Notifications",
      value: stats?.totalNotifications,
      icon: Bell,
      description: "Total notifications",
    },
    {
      title: "Current Streak",
      value: `${stats?.currentStreak}d`,
      icon: Flame,
      description: `Best ${stats?.longestStreak}d`,
    },
  ];

  const xpCards = [
    { title: "Lesson XP", value: xp?.lessonXP, icon: BookOpen },
    { title: "Course XP", value: xp?.courseXP, icon: GraduationCap },
    { title: "Quiz XP", value: xp?.quizXP, icon: Brain },
    { title: "Achievement XP", value: xp?.achievementXP, icon: Trophy },
    { title: "Streak XP", value: xp?.streakXP, icon: Flame },
    { title: "Bookmark XP", value: xp?.bookmarkXP, icon: Bookmark },
  ];

  if (isLoading || isFetching || isAchievementLoading || isAchievementFetching) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <Alert className="my-5">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (isAchievementError) {
    return (
      <Alert className="my-5">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{achievementError.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-linear-to-r from-primary/20 via-primary/10 to-background" />
        <CardContent className="relative pt-0">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={user?.profile?.avatarUrl as string} />
                <AvatarFallback className="text-4xl font-bold">
                  {user.profile?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {user.profile?.name || "Unnamed User"}
                  </h1>
                  <p className="text-muted-foreground">
                    @{user.profile?.username || "no-username"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {user.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                    {user.role}
                  </Badge>
                  <Badge variant="outline">
                    <Zap className="mr-1 h-3 w-3" />
                    Level {level}
                  </Badge>
                  <Badge variant="outline">
                    <Flame className="mr-1 h-3 w-3 text-orange-500" />
                    {stats.currentStreak} Day Streak
                  </Badge>
                </div>
              </div>
            </div>
            <Card className="w-full lg:w-[320px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  XP Progress
                </CardTitle>
                <CardDescription>
                  {currentLevelXP} / {nextLevelXP} XP to next level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={xpProgress} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{xp.totalXP.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="xp">XP Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Quiz Performance
                </CardTitle>
                <CardDescription>User learning analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Score</span>
                      <span className="font-medium">{Number(stats.averageScore).toFixed(1)}%</span>
                    </div>
                    <Progress value={Number(stats.averageScore)} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Highest Score</span>
                      <span className="font-medium">{Number(stats.highestScore).toFixed(1)}%</span>
                    </div>
                    <Progress value={Number(stats.highestScore)} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Lowest Score</span>
                      <span className="font-medium">{Number(stats.lowestScore).toFixed(1)}%</span>
                    </div>
                    <Progress value={Number(stats.lowestScore)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Attempts</p>
                    <p className="text-2xl font-bold">{stats.totalQuizAttempts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Answer Submissions</p>
                    <p className="text-2xl font-bold">{stats.totalAnswerSubmissions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  User Activity
                </CardTitle>
                <CardDescription>Recent learning activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Last Enrolled Course</p>
                      <p className="text-sm text-muted-foreground">
                        {userData.lastEnroll || "No enrollments yet"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Last Lesson Progress</p>
                      <p className="text-sm text-muted-foreground">
                        {userData.lastProgress || "No progress yet"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-orange-500/10 p-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">Learning Streak</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {stats.currentStreak} days • Best: {stats.longestStreak} days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-500/10 p-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium">Achievement Progress</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.achievementsCount} achievements unlocked
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                User Achievements
              </CardTitle>
              <CardDescription>User all achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-3">
                {achievements?.achievements.map((achievement) => (
                  <AchievementBadge achievement={achievement} key={achievement.id} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="xp" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {xpCards.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      <h3 className="text-3xl font-bold">{item.value}</h3>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Total XP Breakdown</CardTitle>
              <CardDescription>Overall user progression system</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {xpCards.map((item) => {
                const percentage = (item.value / xp.totalXP) * 100;

                return (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Detailed account information</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.profile?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">@{user.profile?.username || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="font-medium">{xp.totalXP}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="font-medium">Level {level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDetails;
