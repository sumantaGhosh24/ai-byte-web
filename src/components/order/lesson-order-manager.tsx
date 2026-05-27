import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson.type";
import { useFixLessonOrder } from "@/hooks/use-lessons";

import SortableLessonRow from "./sortable-lesson-row";

interface Props {
  courseId: string;
  lessons: Lesson[];
}

const LessonOrderManager = ({ courseId, lessons }: Props) => {
  const [items, setItems] = useState(lessons);

  const changeOrder = useFixLessonOrder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);

      const newIndex = items.findIndex((i) => i.id === over.id);

      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const saveOrder = () => {
    changeOrder.mutate(
      {
        courseId,
        lessons: items.map((lesson, index) => ({
          id: lesson.id,
          orderIndex: index + 1,
        })),
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {items.map((lesson) => (
              <SortableLessonRow key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={saveOrder} disabled={changeOrder.isPending} className="w-full">
        {changeOrder.isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Order"
        )}
      </Button>
    </div>
  );
};

export default LessonOrderManager;
