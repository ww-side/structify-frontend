'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Select, SelectItem } from '@heroui/select';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { X } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Text } from '@/shared/ui/kit/text';

import { type Column, updateColumnSchema } from '../lib';
import { deleteColumn, updateColumn, useColumnStore } from '../services';

export function ColumnEditDialog({ value }: { value: Column }) {
  const { remove, update } = useColumnStore();
  const { close } = useDialogStore();

  const { Field, Subscribe, handleSubmit, getFieldValue, setFieldValue } =
    useForm({
      defaultValues: { name: value.name, variants: value.variants ?? [] },
      validators: { onChange: updateColumnSchema },
      onSubmit: async ({ value: data }) => {
        try {
          await updateColumn({
            id: value.id,
            name: data.name,
            variants: data.variants,
          });
          update(value.id, { name: data.name, variants: data.variants });
          notifySuccess('Column updated successfully');
        } catch (err) {
          console.error(err);
          notifyDanger('Failed to update column');
        } finally {
          close();
        }
      },
    });

  const removeVariant = (variant: string) => {
    const variants = getFieldValue('variants');
    const updatedVariants = variants.filter(v => v !== variant);

    setFieldValue('variants', updatedVariants);
  };

  const addVariant = (variant: string) => {
    const variants = getFieldValue('variants');
    if (variant && !variants.includes(variant)) {
      const updatedVariants = [...variants, variant];
      setFieldValue('variants', updatedVariants);
    } else {
      notifyDanger('Variant already exists or is empty');
    }
  };

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
      {value.dataType === 'select' ? (
        <Field name="variants">
          {field => (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Autocomplete
                id={field.name}
                name={field.name}
                label="Create new variant"
                size="sm"
                disabledKeys={field.state.value}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addVariant(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              >
                {field.state.value.map(variant => (
                  <AutocompleteItem key={variant}>
                    <Text>{variant}</Text>
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Select
                id={field.name}
                name={field.name}
                label="Delete variant"
                size="sm"
              >
                {field.state.value.map(variant => (
                  <SelectItem key={variant}>
                    <span className="flex items-center justify-between">
                      <Text>{variant}</Text>
                      <button
                        className="cursor-pointer"
                        onClick={() => removeVariant(variant)}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </Field>
      ) : null}
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
