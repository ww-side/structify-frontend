'use client';

import { useForm } from '@/shared/lib/forms';
import { Button } from '@/shared/ui/kit/button';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { signInSchema } from '../../lib/sign-in.schema';

export function SignInForm() {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: async ({ value }) => console.log(value),
  });

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit().catch(console.error);
      }}
    >
      <div className="flex flex-col gap-5 w-full mb-3">
        <Field name="username">
          {field => (
            <Input
              fullWidth
              id={field.name}
              name={field.name}
              label="Username"
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
        <Field name="password">
          {field => (
            <Input
              id={field.name}
              name={field.name}
              label="Password"
              type="password"
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
      </div>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            size="xl"
            type="submit"
            disabled={!canSubmit}
            color="primary"
            fullWidth
          >
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}
