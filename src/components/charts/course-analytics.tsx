import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface CourseAnalyticsProps {
  courses: AdminDashboardResponse["dashboard"]["courses"];
}

const CourseAnalytics = ({ courses }: CourseAnalyticsProps) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={courses.status} dataKey="_count" nameKey="status" fill="#193cb8" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={courses.difficulty}>
          <XAxis dataKey="difficulty" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="_count" fill="#193cb8" />
        </BarChart>
      </ResponsiveContainer>
      <Card>
        <CardHeader>
          <CardTitle>Top Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Bookmarks</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.topCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.enrollments}</TableCell>
                  <TableCell>{course.bookmarks}</TableCell>
                  <TableCell>{course.reviews}</TableCell>
                  <TableCell>{course.averageRating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAnalytics;
