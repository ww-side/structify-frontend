'use client';

import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';
import { createRowValue, updateRowValue } from '@/features/row-value/services';
import { useRowsStore } from '@/features/rows/services';
import {
  createdDataBuilder,
  editedFormDataMapping,
  updatedDataBuilder,
} from '@/features/view/lib';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

export function EditDialog({
  columns,
  record,
  viewId,
  rowValues,
}: {
  record: Record<string, string>;
  columns: Column[];
  viewId: string;
  rowValues: RowValue[];
}) {
  const { update } = useRowsStore();
  const { close } = useDialogStore();

  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: columns.reduce(
      (acc, { key }) => ({ ...acc, [key]: record[key] ?? '' }),
      {} as Record<string, string>,
    ),
    onSubmit: async ({ value }) => {
      const mappedData = editedFormDataMapping({
        formValue: value,
        viewId,
        rowId: record.key,
        columns,
      });

      const updatedData = updatedDataBuilder({ data: mappedData, rowValues });
      const createdData = createdDataBuilder({ data: mappedData, rowValues });

      try {
        await Promise.all([
          ...createdData.map(createRowValue),
          ...updatedData.map(updateRowValue),
        ]);
        update(record.key, value);
        close();
        notifySuccess('Row updated successfully');
      } catch (err) {
        notifyDanger('Error updating row value');
        console.error('Update row value error', err);
      }
    },
  });

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit().catch(console.error);
      }}
    >
      {columns.map(({ key, name }) => (
        <Field name={key} key={key}>
          {field => (
            <Input
              id={field.name}
              name={field.name}
              label={name}
              value={field.state.value}
              placeholder="Enter your value"
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
      ))}
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        <Button type="submit">Save</Button>
      </Subscribe>
    </Form>
  );
}
