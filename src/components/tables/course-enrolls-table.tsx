import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

import { useEnrolls } from "@/hooks/use-enrolls";
import type { EnrollItem } from "@/types/enroll.type";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import { EnrollTableRowSkeleton } from "../skeleton/enroll-table-row-skeleton";

const CourseEnrollsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [completed, setCompleted] = useState("all");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);

      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch, isError, error } = useEnrolls({
    page,
    limit,
    search,
    courseId: id,
    completed: completed === "all" ? null : completed === "true" ? true : false,
    userId,
  });

  const columns = useMemo<ColumnDef<EnrollItem>[]>(
    () => [
      {
        accessorKey: "user",
        header: "Student",
        cell: ({ row }) => {
          const user = row.original.user;

          return (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.profile.avatarUrl ?? ""} />
                <AvatarFallback>{user.profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.profile.name}</p>
                <p className="text-xs text-muted-foreground">@{user.profile.username}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.user.email,
      },
      {
        accessorKey: "finishedLessons",
        header: "Finished Lessons",
        cell: ({ row }) => <Badge variant="secondary">{row.original.finishedLessons}</Badge>,
      },
      {
        accessorKey: "completed",
        header: "Status",
        cell: ({ row }) => {
          const completed = row.original.completed;

          return (
            <Badge variant={completed ? "default" : "secondary"}>
              {completed ? "Completed" : "Learning"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "startedAt",
        header: "Started",
        cell: ({ row }) => new Date(row.original.startedAt).toLocaleDateString(),
      },
      {
        accessorKey: "finishedAt",
        header: "Finished",
        cell: ({ row }) => new Date(row.original.finishedAt).toLocaleDateString(),
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
      <Alert>
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="space-y-6 p-4 sm:p-6 container mx-auto">
      <div className="flex flex-col gap-4">
        <CardHeader className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Enrolls</CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all enrolls of this course.
            </CardDescription>
          </div>
          <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
            Refresh
          </Button>
        </CardHeader>
        <Input
          placeholder="Search enrolls..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Input
            placeholder="Search user..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Select value={completed} onValueChange={(value) => setCompleted(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select enroll completed status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Completed</SelectItem>
              <SelectItem value="false">Not Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1">
        {isLoading || isFetching ? (
          [...Array(1)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Enrolls" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Enrolls</CardTitle>
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
                  [...Array(limit)].map((_, i) => <EnrollTableRowSkeleton key={i} />)
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
                      No enrolls found.
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

export default CourseEnrollsTable;
