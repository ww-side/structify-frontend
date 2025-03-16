'use client';

import { ApolloError, useMutation } from '@apollo/client';

import { GET_VIEWS } from '@/features/sidebar/services/views.query';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { createViewSchema } from '../lib/schemas';
import { CREATE_VIEW_MUTATION } from '../services';
import { ViewFormatsSelect } from './view-formats-select';
import { ViewIconsSelect } from './view-icons-select';

export function CreateViewForm({
  onAfterSubmit,
}: {
  onAfterSubmit?: () => void;
}) {
  const [createView] = useMutation(CREATE_VIEW_MUTATION, {
    refetchQueries: [{ query: GET_VIEWS }],
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      formats: ['table'],
      icon: '',
    },
    validators: {
      onChange: createViewSchema,
    },
    onSubmit: async data => {
      try {
        await createView({
          variables: {
            createViewInput: {
              name: data.value.name,
              formats: data.value.formats,
              icon: data.value.icon,
            },
          },
        });
        notifySuccess('View created');
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
        onAfterSubmit?.();
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
            {isSubmitting ? '...' : 'Create'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}
