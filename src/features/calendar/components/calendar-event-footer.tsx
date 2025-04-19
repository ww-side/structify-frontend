import { Button } from '@/shared/ui/kit/button';
import { Tooltip } from '@/shared/ui/kit/tooltip';

export function CalendarEventFooter({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <section className="flex w-full items-center gap-5 mt-5">
      <Tooltip color="danger" content="This action cannot be undone.">
        <Button color="danger" onPress={onDelete} fullWidth>
          Delete
        </Button>
      </Tooltip>
      <Button color="primary" onPress={onEdit} fullWidth>
        Edit
      </Button>
    </section>
  );
}
