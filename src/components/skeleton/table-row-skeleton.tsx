import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

interface TableRowSkeletonProps {
  count: number;
}

const TableRowSkeleton = ({ count }: TableRowSkeletonProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-16 w-24 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </TableCell>
      {[...Array(count)].map((_, i) => (
        <TableCell key={i}>
          <Skeleton className="h-5 w-20" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowSkeleton;
