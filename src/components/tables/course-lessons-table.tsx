import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { AlertTriangle, ChevronLeft, ChevronRight, Eye, Pen, Trash } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { useDeleteLesson, useLessons } from "@/hooks/use-lessons";
import { useDestroyFile } from "@/hooks/use-uploads";
import type {
  LessonDifficulty,
  LessonItem,
  LessonStatus,
  LessonVisibility,
} from "@/types/lesson.type";

import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import TableRowSkeleton from "../skeleton/table-row-skeleton";

const CourseLessonsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState<LessonDifficulty | "all">("all");
  const [visibility, setVisibility] = useState<LessonVisibility | "all">("all");
  const [status, setStatus] = useState<LessonStatus | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch, isError, error } = useLessons({
    page,
    limit,
    search,
    courseId: id as string,
    difficulty: difficulty === "all" ? null : difficulty,
    visibility: visibility === "all" ? null : visibility,
    status: status === "all" ? null : status,
  });

  const deleteFile = useDestroyFile();

  const deleteLesson = useDeleteLesson();

  const columns = useMemo<ColumnDef<LessonItem>[]>(
    () => [
      {
        accessorKey: "lesson",
        header: "Lesson",
        cell: ({ row }) => {
          const lesson = row.original;

          return (
            <div className="flex items-center gap-3 max-w-112.5">
              <img
                src={lesson.thumbnailUrl ?? "/dummy.png"}
                alt={lesson.thumbnailPublicId ?? "dummy"}
                className="h-16 w-24 rounded-lg object-cover shrink-0 hidden md:block"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium capitalize truncate">{lesson.title}</p>
              </div>
            </div>
          );
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
      { accessorKey: "orderIndex", header: "Order" },
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
          const lesson = row.original;

          return (
            <div className="space-y-1 text-sm">
              <p>Progresses: {lesson.progressCount}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          return formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true });
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const lesson = row.original;

          const handleDelete = () => {
            if (lesson.thumbnailPublicId) {
              deleteFile.mutate(
                { public_id: lesson.thumbnailPublicId! },
                {
                  onError: (error) => toast.error(error.message),
                },
              );
            }
            if (lesson.videoPublicId) {
              deleteFile.mutate(
                { public_id: lesson.videoPublicId! },
                {
                  onError: (error) => toast.error(error.message),
                },
              );
            }
            deleteLesson.mutate(
              { id: lesson.id },
              {
                onError: (error) => toast.error(error.message),
                onSuccess: (data) => {
                  toast.success(data.message);
                },
              },
            );
          };

          return (
            <div className="flex gap-3">
              <Button size="sm" asChild>
                <Link to={`/lesson/${lesson.id}`}>
                  <Eye className="md:mr-2 h-4 w-4" />
                  <span className="hidden md:block">View</span>
                </Link>
              </Button>
              <Button variant="success" size="sm" asChild>
                <Link to={`/lessons/${lesson.id}/edit`}>
                  <Pen className="md:mr-2 h-4 w-4" />
                  <span className="hidden md:block">Update</span>
                </Link>
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],

    [deleteFile, deleteLesson],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.result?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <Alert className="my-5">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <CardHeader className="flex items-center justify-between p-0">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Lessons</CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all lessons of this course.
            </CardDescription>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button asChild disabled={isLoading || isFetching}>
              <Link to={`/lessons/create/${id}`}>Create Lesson</Link>
            </Button>
            <Button variant="success" asChild disabled={isLoading || isFetching}>
              <Link to={`/lessons/generate/${id}`}>Generate AI Lesson</Link>
            </Button>
            <Button variant="success" asChild disabled={isLoading || isFetching}>
              <Link to={`/lesson/${id}/fix`}>Fix Lessons Order</Link>
            </Button>
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <Input
          placeholder="Search lessons..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Select
            value={difficulty}
            onValueChange={(value: LessonDifficulty) => setDifficulty(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select lessons difficulty" />
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
            onValueChange={(value: LessonVisibility) => setVisibility(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select lessons visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value: LessonStatus) => setStatus(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select lessons status" />
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
            <StatsCard title="Total Lessons" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Lessons</CardTitle>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-30">
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
                  [...Array(limit)].map((_, i) => <TableRowSkeleton key={i} count={9} />)
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
                      No lessons found.
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
    </Card>
  );
};

export default CourseLessonsTable;
