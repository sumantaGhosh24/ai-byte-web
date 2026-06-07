import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { useReviews } from "@/hooks/use-reviews";
import type { ReviewItem } from "@/types/review.type";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import StatsCardSkeleton from "../skeleton/stats-card-skeleton";
import StatsCard from "../card/stats-card";
import TableRowSkeleton from "../skeleton/table-row-skeleton";

const CourseReviewsTable = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [userId, setUserId] = useState("");

  const { data, isLoading, isFetching, refetch, isError, error } = useReviews({
    page,
    limit,
    courseId: id as string,
    userId,
  });

  const columns = useMemo<ColumnDef<ReviewItem>[]>(
    () => [
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
          const user = row.original.user;

          return (
            <div className="flex items-center gap-3">
              <Avatar className="hidden md:block">
                <AvatarImage src={user.profile?.avatarUrl ?? ""} />
                <AvatarFallback>{user.profile?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.profile?.name}</p>
                <p className="text-xs text-muted-foreground">@{user.profile?.username}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "message",
        header: "Review",
        cell: ({ row }) => <div className="max-w-md">{row.original.message}</div>,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {row.original.rating}/5
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true }),
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

  const averageRating = data?.result?.items?.length
    ? (
        data.result.items.reduce((acc, item) => acc + item.rating, 0) / data.result.items.length
      ).toFixed(1)
    : 0;

  return (
    <Card className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <CardHeader className="flex items-center justify-between p-0">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Reviews</CardTitle>
            <CardDescription className="text-sm text-muted-foreground sm:text-base">
              Manage all reviews of this course.
            </CardDescription>
          </div>
          <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
            Refresh
          </Button>
        </CardHeader>
        <Input
          placeholder="Search user..."
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {isLoading || isFetching ? (
          [...Array(2)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Reviews" value={data?.result?.paginations?.total} />
            <StatsCard title="Average Ratings (10 reviews)" value={averageRating} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Reviews</CardTitle>
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
                  [...Array(limit)].map((_, i) => <TableRowSkeleton key={i} count={3} />)
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
                      No reviews found.
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

export default CourseReviewsTable;
