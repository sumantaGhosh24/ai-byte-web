import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { AlertTriangle, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { useDeleteQuestion, useQuestions } from "@/hooks/use-questions";
import type {
  QuestionDifficulty,
  QuestionItem,
  QuestionStatus,
  QuestionVisibility,
} from "@/types/question.type";

import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import CreateQuestionForm from "../form/create-question-form";
import UpdateQuestionForm from "../form/update-question-form";
import TableRowSkeleton from "../skeleton/table-row-skeleton";

const QuizQuestionsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [visibility, setVisibility] = useState<QuestionVisibility | "all">("all");
  const [status, setStatus] = useState<QuestionStatus | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch, isError, error } = useQuestions({
    page,
    limit,
    search,
    quizId: id,
    difficulty: difficulty === "all" ? null : difficulty,
    visibility: visibility === "all" ? null : visibility,
    status: status === "all" ? null : status,
  });

  const deleteQuestion = useDeleteQuestion();

  const columns = useMemo<ColumnDef<QuestionItem>[]>(
    () => [
      {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => {
          const question = row.original;

          return (
            <div className="max-w-[350px]">
              <p className="font-medium line-clamp-2">{question.question}</p>
              {question.explanation && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {question.explanation}
                </p>
              )}
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
        accessorKey: "correctAnswer",
        header: "Correct Answer",
        cell: ({ row }) => {
          return (
            <div className="max-w-[180px] truncate font-medium text-green-600">
              {row.original.correctAnswer}
            </div>
          );
        },
      },

      {
        accessorKey: "answersCount",
        header: "Attempts",
        cell: ({ row }) => {
          return <span className="font-medium">{row.original.answersCount}</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true }),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const question = row.original;

          const handleDelete = () => {
            deleteQuestion.mutate(
              { id: question.id },
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
              <UpdateQuestionForm question={question} disabled={isLoading || isFetching} />
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],

    [deleteQuestion, isFetching, isLoading],
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
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
              Questions
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all questions of this quiz.
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <CreateQuestionForm disabled={isLoading || isFetching} quizId={id} />
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <Input
          placeholder="Search questions..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Select
            value={difficulty}
            onValueChange={(value: QuestionDifficulty) => setDifficulty(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select questions difficulty" />
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
            onValueChange={(value: QuestionVisibility) => setVisibility(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select questions visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value: QuestionStatus) => setStatus(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select questions status" />
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
            <StatsCard title="Total Questions" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Questions</CardTitle>
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
                  [...Array(limit)].map((_, i) => <TableRowSkeleton key={i} count={8} />)
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
                      No questions found.
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

export default QuizQuestionsTable;
