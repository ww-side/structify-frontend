'use client';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';

import { signUpSchema } from '../../lib';
import { signUp } from '../../services';

export function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await signUp(value);

      if (res?.statusCode === 200) {
        notifySuccess(res.message);
        onSuccess();
      } else {
        notifyDanger(res?.message ?? 'Try again later');
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
        <Field name="email">
          {field => (
            <Input
              fullWidth
              id={field.name}
              name={field.name}
              label="Email"
              type="email"
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
        <div className="flex items-center gap-5">
          <Field name="firstName">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="First Name"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
              />
            )}
          </Field>
          <Field name="lastName">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="Last Name"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
              />
            )}
          </Field>
        </div>
        <Field name="password">
          {field => (
            <Input
              id={field.name}
              type="password"
              name={field.name}
              label="Password"
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.map(err => err?.message)}
              isInvalid={!!field.state.meta.errors.length}
            />
          )}
        </Field>
        <Field name="confirmPassword">
          {field => (
            <Input
              id={field.name}
              name={field.name}
              type="password"
              label="Confirm Password"
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
