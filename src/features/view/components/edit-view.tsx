'use client';

import { ApolloError, useMutation } from '@apollo/client';

import { ViewFormatsSelect } from '@/features/create-view/components/view-formats-select';
import { ViewIconsSelect } from '@/features/create-view/components/view-icons-select';
import { createViewSchema } from '@/features/create-view/lib';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { GET_VIEWS } from '../services';
import { EDIT_VIEW_MUTATION } from '../services/views.mutation';

export function EditView({
  id,
  formats,
  icon,
  name,
}: {
  id: string;
  name: string;
  formats: string[];
  icon: string;
}) {
  const { close } = useDialogStore();

  const [editView] = useMutation(EDIT_VIEW_MUTATION, {
    refetchQueries: [{ query: GET_VIEWS }],
    onError: error => console.error('Error editing view:', error),
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name,
      formats,
      icon,
    },
    validators: {
      onChange: createViewSchema,
    },
    onSubmit: async data => {
      try {
        await editView({
          variables: {
            updateViewInput: {
              id,
              name: data.value.name,
              icon: data.value.icon,
              formats: data.value.formats,
            },
          },
        });
        notifySuccess('View updated');
      } catch (error) {
        if (error instanceof ApolloError) {
          const errorMessage =
            error.message ||
            'An unknown error occurred while creating the view.';
          notifyDanger(errorMessage);
        } else {
          console.error('Error creating view:', error);
          notifyDanger('An unknown error occurred while creating the view.');
        }
      } finally {
        close();
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
        <Field name="formats">
          {field => (
            <ViewFormatsSelect
              value={field.state.value}
              onChange={newValue => field.handleChange(newValue)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
        <Field name="icon">
          {field => (
            <ViewIconsSelect
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
            {isSubmitting ? '...' : 'Update'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}
