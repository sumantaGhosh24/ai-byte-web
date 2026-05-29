import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Pen, Search, Trash } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNowStrict } from "date-fns";

import { useDestroyFile } from "@/hooks/use-uploads";
import { useAdminCategories, useDeleteCategory } from "@/hooks/use-categories";
import type { CategoryItem } from "@/types/category.type";
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
import StatsCard from "@/components/card/stats-card";
import StatsCardSkeleton from "@/components/skeleton/stats-card-skeleton";
import TableRowSkeleton from "@/components/skeleton/table-row-skeleton";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch } = useAdminCategories({ page, limit, search });

  const deleteCategory = useDeleteCategory();

  const deleteImage = useDestroyFile();

  const columns = useMemo<ColumnDef<CategoryItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const name = row.original.name;

          return <p className="capitalize w-[100px]">{name}</p>;
        },
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
          const category = row.original;

          return (
            <div>
              <img
                src={category.imageUrl}
                alt={category.imagePublicId}
                className="w-[100px] rounded"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "visibility",
        header: "Role",
        cell: ({ row }) => {
          const visibility = row.original.visibility;

          return (
            <Badge variant={visibility === "public" ? "default" : "warning"}>{visibility}</Badge>
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
          const category = row.original;

          const handleDeleteCategory = () => {
            deleteImage.mutate(
              { public_id: category.imagePublicId },
              {
                onError: (error) => toast.error(error.message),
                onSuccess: () => {
                  deleteCategory.mutate(
                    { id: category.id },
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
            <div className="flex gap-4">
              <Button variant="success" size="sm" asChild>
                <Link to={`/categories/${category.id}/edit`}>
                  <Pen className="md:mr-2 h-4 w-4" />
                  <span className="hidden md:block">Update</span>
                </Link>
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDeleteCategory}>
                <Trash className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [deleteCategory, deleteImage],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.result?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 p-4 sm:p-6 my-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Categories</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage all categories and analytics.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild disabled={isLoading || isFetching}>
              <Link to="/categories/create">Create Category</Link>
            </Button>
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </div>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1">
        {isLoading || isFetching ? (
          [...Array(1)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Categories" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Categories</CardTitle>
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
                      No categories found.
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

export default CategoriesPage;
