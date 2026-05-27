import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson.type";

interface SortableLessonRowProps {
  lesson: Lesson;
}

const SortableLessonRow = ({ lesson }: SortableLessonRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lesson.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg p-4 bg-background flex items-center gap-3"
    >
      <Button size="icon" variant="ghost" {...listeners} {...attributes}>
        <GripVertical className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <p className="font-medium">{lesson.title}</p>
        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
      </div>
    </div>
  );
};

export default SortableLessonRow;
