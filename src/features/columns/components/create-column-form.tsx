'use client';

import { createColumn } from '@/features/columns/services';
import { useColumnStore } from '@/features/columns/services/columns.store';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { createColumnSchema } from '../lib';
import { ColumnDataTypeSelect } from './column-data-type-select';

export function CreateColumnForm({
  viewId,
  onClose,
}: {
  onClose: () => void;
  viewId: string;
}) {
  const { create } = useColumnStore();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      dataType: '',
    },
    validators: {
      onChange: createColumnSchema,
    },
    onSubmit: async data => {
      try {
        const { data: res } = await createColumn({
          viewId,
          dataType: data.value.dataType,
          name: data.value.name,
        });
        create({
          name: res.name,
          dataType: res.dataType,
          id: res.id,
          key: res.name,
          variants: [],
        });
        notifySuccess(`Column ${data.value.name} created`);
        onClose?.();
      } catch (error) {
        let errorMessage =
          'An unknown error occurred while creating the column.';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        notifyDanger(errorMessage);
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
      <section className="flex flex-col gap-5 w-full mb-5">
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
        <Field name="dataType">
          {field => (
            <ColumnDataTypeSelect
              value={field.state.value}
              onChange={newValue => field.handleChange(newValue)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
      </section>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} color="primary" fullWidth>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}
