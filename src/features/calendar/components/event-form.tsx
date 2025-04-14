'use client';

import { parseDateTime } from '@internationalized/date';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { DatePicker } from '@/shared/ui/kit/date-picker';
import { Form } from '@/shared/ui/kit/form';
import { Input, Textarea } from '@/shared/ui/kit/input';

import { type CalendarEventDef, createEventSchema } from '../lib';
import { createEvent, updateEvent, useCalendarStore } from '../services';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function EventForm({
  event: {
    description = '',
    end = new Date(),
    id,
    location = '',
    notes = '',
    start = new Date(),
    title = '',
  },
  onAfterSubmit,
}: {
  event: Partial<CalendarEventDef>;
  onAfterSubmit?: () => void;
}) {
  const { create, update } = useCalendarStore();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      title,
      description,
      start,
      end,
      location,
      notes,
    },
    validators: {
      onChange: createEventSchema,
    },
    onSubmit: async ({ value }) => {
      if (!id) {
        const res = await createEvent(value);

        if (res.statusCode === 200) {
          create(res.data);
          notifySuccess('Event created successfully');
        } else {
          notifyDanger('Failed to create event');
        }
      } else {
        const res = await updateEvent({ ...value, id });

        if (res.statusCode === 200) {
          update(id, res.data);
          notifySuccess('Event updated successfully');
        } else {
          notifyDanger('Failed to update event');
        }
      }

      onAfterSubmit?.();
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
      <Field name="title">
        {field => (
          <Input
            fullWidth
            id={field.name}
            name={field.name}
            label="Title"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Field name="description">
        {field => (
          <Textarea
            fullWidth
            id={field.name}
            name={field.name}
            label="Description"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Field name="start">
        {field => (
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={parseDateTime(
              field.state.value.toISOString().replace(/\.\d{3}Z$/, ''),
            )}
            label="Start Date"
            variant="bordered"
            onChange={date => {
              field.handleChange(date?.toDate(timeZone) ?? new Date());
            }}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Field name="end">
        {field => (
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={parseDateTime(
              field.state.value.toISOString().replace(/\.\d{3}Z$/, ''),
            )}
            label="End Date"
            variant="bordered"
            onChange={date => {
              field.handleChange(date?.toDate(timeZone) ?? new Date());
            }}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Field name="location">
        {field => (
          <Input
            fullWidth
            id={field.name}
            name={field.name}
            label="Location"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Field name="notes">
        {field => (
          <Textarea
            fullWidth
            id={field.name}
            name={field.name}
            label="Notes"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.map(err => err?.message)}
            isInvalid={!!field.state.meta.errors.length}
          />
        )}
      </Field>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} color="primary" fullWidth>
            {isSubmitting ? 'Processing...' : id ? 'Update' : 'Create'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}
