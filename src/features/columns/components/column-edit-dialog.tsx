'use client';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { type Column, updateColumnSchema } from '../lib';
import { deleteColumn, updateColumn, useColumnStore } from '../services';

export function ColumnEditDialog({ value }: { value: Column }) {
  const { remove, update } = useColumnStore();
  const { close } = useDialogStore();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: { name: value.name },
    validators: { onChange: updateColumnSchema },
    onSubmit: async ({ value: data }) => {
      console.log('@val dat', data);

      try {
        await updateColumn({ id: value.id, name: data.name });
        update(value.id, { name: data.name });
        notifySuccess('Column updated successfully');
      } catch (err) {
        console.error(err);
        notifyDanger('Failed to update column');
      } finally {
        close();
      }
    },
  });

  const deleteHandler = async () => {
    try {
      await deleteColumn(value.id);
      remove(value.id);
      notifySuccess('Column deleted successfully');
    } catch (err) {
      console.error('Error delete column', err);
      notifyDanger('Failed to delete column');
    } finally {
      close();
    }
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit().catch(console.error);
      }}
    >
      <Field name="name">
        {field => (
          <Input
            fullWidth
            id={field.name}
            name={field.name}
            label="Name"
            size="sm"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <section className="flex items-center gap-5 mt-5 w-full">
        <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} fullWidth>
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          )}
        </Subscribe>
        <Button type="button" color="danger" onPress={deleteHandler} fullWidth>
          Delete
        </Button>
      </section>
    </Form>
  );
}
