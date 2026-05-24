import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export const CategoriesTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-[140px]" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-24 rounded-md" />
      </TableCell>
    </TableRow>
  );
};
