import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Eye, Pen, Trash } from "lucide-react";
import { toast } from "sonner";

import { useDestroyImage } from "@/hooks/use-uploads";
import { useCourses, useDeleteCourse } from "@/hooks/use-courses";
import { useCategories } from "@/hooks/use-categories";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCardSkeleton from "@/components/skeleton/stats-card-skeleton";
import StatsCard from "@/components/card/stats-card";
import { CourseTableRowSkeleton } from "@/components/skeleton/course-table-row-skeleton";
import type {
  CourseDifficulty,
  CourseItem,
  CourseStatus,
  CourseVisibility,
} from "@/types/course.type";

const CoursesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState<CourseDifficulty | "all">("all");
  const [visibility, setVisibility] = useState<CourseVisibility | "all">("all");
  const [status, setStatus] = useState<CourseStatus | "all">("all");
  const [categoryId, setCategoryId] = useState<string>("all");

  const {
    data: categories,
    isFetching: isCategoriesFetching,
    isLoading: isCategoriesLoading,
  } = useCategories();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch } = useCourses({
    page,
    limit,
    search,
    difficulty: difficulty === "all" ? null : difficulty,
    visibility: visibility === "all" ? null : visibility,
    status: status === "all" ? null : status,
    categoryId: categoryId === "all" ? null : categoryId,
  });

  const deleteCourse = useDeleteCourse();

  const deleteImage = useDestroyImage();

  const columns = useMemo<ColumnDef<CourseItem>[]>(
    () => [
      {
        accessorKey: "course",
        header: "Course",
        cell: ({ row }) => {
          const course = row.original;

          return (
            <div className="flex items-center gap-3 max-w-[450px]">
              {course.thumbnailUrl && (
                <img
                  src={course.thumbnailUrl}
                  alt={course.thumbnailPublicId}
                  className="h-16 w-24 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium capitalize truncate">{course.title}</p>
                <p className="text-sm text-muted-foreground truncate">{course.description}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return <Badge>{row.original.category.name}</Badge>;
        },
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
          const difficulty = row.original.difficulty;

          return (
            <Badge
              variant={
                difficulty === "beginner"
                  ? "success"
                  : difficulty === "intermediate"
                    ? "default"
                    : "destructive"
              }
            >
              {difficulty}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <Badge
              variant={
                status === "completed"
                  ? "success"
                  : status === "processing"
                    ? "warning"
                    : status === "pending"
                      ? "warning"
                      : "destructive"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      { accessorKey: "duration", header: "Duration" },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: ({ row }) => {
          const visibility = row.original.visibility;

          return (
            <Badge variant={visibility === "public" ? "success" : "warning"}>{visibility}</Badge>
          );
        },
      },
      {
        accessorKey: "aiGenerated",
        header: "Ai Generated",
        cell: ({ row }) => {
          const aiGenerated = row.original.aiGenerated;

          return (
            <Badge variant={aiGenerated ? "warning" : "success"}>
              {aiGenerated ? "True" : "False"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "analytics",
        header: "Analytics",

        cell: ({ row }) => {
          const course = row.original;

          return (
            <div className="space-y-1 text-sm">
              <p>Lessons: {course.lessonsCount}</p>
              <p>Enrolls: {course.enrollsCount}</p>
              <p>Quizzes: {course.quizzesCount}</p>
              <p>Bookmarks: {course.bookmarksCount}</p>
              <p>
                Rating: {Number(course.averageReview).toFixed(1)}({course.reviewsCount})
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          return new Date(row.original.createdAt).toLocaleDateString();
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const course = row.original;

          const handleDelete = () => {
            deleteImage.mutate(
              {
                public_id: course.thumbnailPublicId!,
              },
              {
                onError: (error) => toast.error(error.message),
                onSuccess: () => {
                  deleteCourse.mutate(
                    {
                      id: course.id,
                    },
                    {
                      onError: (error) => toast.error(error.message),
                      onSuccess: (data) => {
                        toast.success(data.message);
                      },
                    },
                  );
                },
              },
            );
          };

          return (
            <div className="flex gap-3">
              <Button size="sm" asChild>
                <Link to={`/course/${course.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button variant="success" size="sm" asChild>
                <Link to={`/courses/${course.id}/edit`}>
                  <Pen className="mr-2 h-4 w-4" /> Update
                </Link>
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          );
        },
      },
    ],

    [deleteCourse, deleteImage],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.result?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 p-4 sm:p-6 container mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Courses</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage all courses and analytics.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild disabled={isLoading || isFetching}>
              <Link to="/courses/create">Create Course</Link>
            </Button>
            <Button variant="success" asChild disabled={isLoading || isFetching}>
              <Link to="/courses/generate">Generate AI Course</Link>
            </Button>
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </div>
        <Input
          placeholder="Search courses..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isCategoriesFetching || isCategoriesLoading ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select courses category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.categories.map((category) => (
                  <SelectItem value={category.id} key={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select
            value={difficulty}
            onValueChange={(value: CourseDifficulty) => setDifficulty(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select courses difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={visibility}
            onValueChange={(value: CourseVisibility) => setVisibility(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select courses visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value: CourseStatus) => setStatus(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select courses status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1">
        {isLoading || isFetching ? (
          [...Array(1)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Courses" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Courses</CardTitle>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 rows</SelectItem>
              <SelectItem value="20">20 rows</SelectItem>
              <SelectItem value="50">50 rows</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading || isFetching ? (
                  [...Array(limit)].map((_, i) => <CourseTableRowSkeleton key={i} />)
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Showing page{" "}
              <span className="font-medium">{data?.result?.paginations?.page || 1}</span> of{" "}
              <span className="font-medium">{data?.result?.paginations?.totalPages || 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!data?.result?.paginations?.previousPage}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!data?.result?.paginations?.nextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesPage;
