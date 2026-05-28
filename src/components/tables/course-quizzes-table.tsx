import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { AlertTriangle, ChevronLeft, ChevronRight, Eye, Pen, Trash } from "lucide-react";

import { useDeleteQuiz, useQuizzes } from "@/hooks/use-quizzes";
import type { QuizDifficulty, QuizItem, QuizStatus, QuizVisibility } from "@/types/quiz.type";

import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import { QuizTableRowSkeleton } from "../skeleton/quiz-table-row-skeleton";

const CourseQuizzesTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState<QuizDifficulty | "all">("all");
  const [visibility, setVisibility] = useState<QuizVisibility | "all">("all");
  const [status, setStatus] = useState<QuizStatus | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch, isError, error } = useQuizzes({
    page,
    limit,
    search,
    courseId: id,
    difficulty: difficulty === "all" ? null : difficulty,
    visibility: visibility === "all" ? null : visibility,
    status: status === "all" ? null : status,
  });

  const deleteQuiz = useDeleteQuiz();

  const columns = useMemo<ColumnDef<QuizItem>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Quiz",
        cell: ({ row }) => {
          const quiz = row.original;

          return (
            <div className="space-y-1">
              <p className="font-medium">{quiz.title}</p>
              <p className="max-w-[300px] truncate text-xs text-muted-foreground">
                {quiz.description}
              </p>
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
        accessorKey: "passingScore",
        header: "Passing",
        cell: ({ row }) => <span>{row.original.passingScore}</span>,
      },
      {
        accessorKey: "questionsCount",
        header: "Questions",
        cell: ({ row }) => <span>{row.original.questionsCount ?? 0}</span>,
      },
      {
        accessorKey: "attemptsCount",
        header: "Attempts",
        cell: ({ row }) => <span>{row.original.attemptsCount ?? 0}</span>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const quiz = row.original;

          const handleDelete = () => {
            deleteQuiz.mutate(
              { id: quiz.id },
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
                <Link to={`/quiz/${quiz.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button variant="success" size="sm" asChild>
                <Link to={`/quizzes/${quiz.id}/edit`}>
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

    [deleteQuiz],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.result?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <Alert>
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <CardHeader className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Quizzes</CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all quizzes of this course.
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <Button asChild disabled={isLoading || isFetching}>
              <Link to={`/quizzes/create/${id}`}>Create Quiz</Link>
            </Button>
            <Button variant="success" asChild disabled={isLoading || isFetching}>
              <Link to={`/quizzes/generate/${id}`}>Generate AI Quiz</Link>
            </Button>
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <Input
          placeholder="Search quizzes..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Select
            value={difficulty}
            onValueChange={(value: QuizDifficulty) => setDifficulty(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quizzes difficulty" />
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
            onValueChange={(value: QuizVisibility) => setVisibility(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quizzes visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value: QuizStatus) => setStatus(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quizzes status" />
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
            <StatsCard title="Total Quizzes" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Quizzes</CardTitle>
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
                  [...Array(limit)].map((_, i) => <QuizTableRowSkeleton key={i} />)
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
                      No quizzes found.
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

export default CourseQuizzesTable;
