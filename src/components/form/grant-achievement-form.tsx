import { toast } from "sonner";
import { Loader2, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGrantAchievement } from "@/hooks/use-achievements";
import {
  type GrantAchievementFormValues,
  grantAchievementSchema,
} from "@/schemas/achievement.schema";
import type { AchievementItem } from "@/types/achievement.type";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AchievementCard } from "../card/achievement-card";

interface GrantAchievementFormProps {
  achievement: AchievementItem;
}

const GrantAchievementForm = ({ achievement }: GrantAchievementFormProps) => {
  const form = useForm<GrantAchievementFormValues>({
    resolver: zodResolver(grantAchievementSchema),
    defaultValues: {
      userId: "",
    },
  });

  const grantAchievement = useGrantAchievement();

  const onSubmit = (values: GrantAchievementFormValues) => {
    grantAchievement.mutate(
      { userId: values.userId, achievementId: achievement.id },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          form.reset();
          toast.success("User achievement granted successfully");
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <User className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Grant to User</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grant Achievement</DialogTitle>
          <DialogDescription>Grant achievement to a user.</DialogDescription>
        </DialogHeader>
        <AchievementCard achievement={achievement} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FieldGroup>
            <Controller
              control={form.control}
              name="userId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>User Id</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter user id"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" disabled={grantAchievement.isPending} className="min-w-[160px]">
            {grantAchievement.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Granting...
              </>
            ) : (
              "Grant Achievement"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GrantAchievementForm;
