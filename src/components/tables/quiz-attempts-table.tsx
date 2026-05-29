import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { useQuizAttempts } from "@/hooks/use-quiz-attempts";
import type { QuizAttemptItem } from "@/types/quiz-attempt.type";

import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import TableRowSkeleton from "../skeleton/table-row-skeleton";

const QuizAttemptsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching, refetch, isError, error } = useQuizAttempts({
    page,
    limit,
    quizId: id,
  });

  const columns = useMemo<ColumnDef<QuizAttemptItem>[]>(
    () => [
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
          const user = row.original.user;

          return (
            <div className="flex items-center gap-3">
              <Avatar className="hidden md:block">
                <AvatarImage src={user.profile?.avatarUrl || ""} />
                <AvatarFallback>{user.profile?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.profile?.name || "Unnamed"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => {
          const score = row.original.score;

          return (
            <Badge>
              <Trophy className="mr-1 size-3" />
              {score}
            </Badge>
          );
        },
      },
      {
        accessorKey: "correctAnswers",
        header: "Correct",
        cell: ({ row }) => `${row.original.correctAnswers}/${row.original.totalQuestions}`,
      },
      {
        id: "percentage",
        header: "Percentage",
        cell: ({ row }) => {
          const item = row.original;

          const percentage = (item.correctAnswers / item.totalQuestions) * 100;

          return <span>{percentage.toFixed(1)}%</span>;
        },
      },
      {
        accessorKey: "submittedAt",
        header: "Submitted",
        cell: ({ row }) => formatDistanceToNowStrict(row.original.submittedAt, { addSuffix: true }),
      },
    ],
    [],
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
              Quiz Attempts
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all quiz attempts of this quiz.
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </CardHeader>
      </div>
      <div className="grid gap-4 grid-cols-1">
        {isLoading || isFetching ? (
          [...Array(1)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Quiz Attempts" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Quiz Attempts</CardTitle>
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
                  [...Array(limit)].map((_, i) => <TableRowSkeleton key={i} count={4} />)
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
                      No quiz attempts found.
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

export default QuizAttemptsTable;
