import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Pen, Trash } from "lucide-react";
import { toast } from "sonner";

import { useDestroyFile } from "@/hooks/use-uploads";
import { useAchievements, useDeleteAchievement } from "@/hooks/use-achievements";
import type { AchievementItem, AchievementRarity, AchievementType } from "@/types/achievement.type";
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
import StatsCardSkeleton from "@/components/skeleton/stats-card-skeleton";
import StatsCard from "@/components/card/stats-card";
import { CourseTableRowSkeleton } from "@/components/skeleton/course-table-row-skeleton";
import GrantAchievementForm from "@/components/form/grant-achievement-form";

const AchievementsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [achievementType, setAchievementType] = useState<AchievementType | "all">("all");
  const [achievementRarity, setAchievementRarity] = useState<AchievementRarity | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch } = useAchievements({
    page,
    limit,
    search,
    achievementType: achievementType === "all" ? null : achievementType,
    achievementRarity: achievementRarity === "all" ? null : achievementRarity,
  });

  const deleteAchievement = useDeleteAchievement();

  const deleteImage = useDestroyFile();

  const columns = useMemo<ColumnDef<AchievementItem>[]>(
    () => [
      {
        accessorKey: "achievement",
        header: "Achievement",
        cell: ({ row }) => {
          const achievement = row.original;

          return (
            <div className="flex items-center gap-3 max-w-[450px]">
              {achievement.badgeImage && (
                <img
                  src={achievement.badgeImage}
                  alt={achievement.badgeImagePublicId}
                  className="h-16 w-24 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium capitalize truncate">{achievement.title}</p>
                <p className="text-sm text-muted-foreground truncate">{achievement.description}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "achievementType",
        header: "Achievement Type",
        cell: ({ row }) => {
          const achievementType = row.original.achievementType;

          return <Badge>{achievementType}</Badge>;
        },
      },
      {
        accessorKey: "achievementRarity",
        header: "Achievement Rarity",
        cell: ({ row }) => {
          const achievementRarity = row.original.achievementRarity;

          return (
            <Badge
              variant={
                achievementRarity === "common"
                  ? "default"
                  : achievementRarity === "rare"
                    ? "success"
                    : achievementRarity === "epic"
                      ? "warning"
                      : "destructive"
              }
            >
              {achievementRarity}
            </Badge>
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
          const achievement = row.original;

          const handleDelete = () => {
            deleteImage.mutate(
              {
                public_id: achievement.badgeImagePublicId!,
              },
              {
                onError: (error) => toast.error(error.message),
                onSuccess: () => {
                  deleteAchievement.mutate(
                    {
                      id: achievement.id,
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
              <Button variant="success" size="sm" asChild>
                <Link to={`/achievements/${achievement.id}/edit`}>
                  <Pen className="mr-2 h-4 w-4" /> Update
                </Link>
              </Button>
              <GrantAchievementForm achievement={achievement} />
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          );
        },
      },
    ],

    [deleteAchievement, deleteImage],
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
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Achievements</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage all achievements and analytics.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild disabled={isLoading || isFetching}>
              <Link to="/achievements/create">Create Achievement</Link>
            </Button>
            <Button variant="warning" onClick={() => refetch()} disabled={isLoading || isFetching}>
              Refresh
            </Button>
          </div>
        </div>
        <Input
          placeholder="Search achievements..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            value={achievementType}
            onValueChange={(value: AchievementType) => setAchievementType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select achievement type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="course_completion">Course Completion</SelectItem>
              <SelectItem value="streak">Streak</SelectItem>
              <SelectItem value="quiz_master">Quiz Master</SelectItem>
              <SelectItem value="first_login">First Login</SelectItem>
              <SelectItem value="milestone">Milestone</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={achievementRarity}
            onValueChange={(value: AchievementRarity) => setAchievementRarity(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select achievement rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1">
        {isLoading || isFetching ? (
          [...Array(1)].map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Achievements" value={data?.result?.paginations?.total} />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Achievements</CardTitle>
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
                      No achievements found.
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

export default AchievementsPage;
