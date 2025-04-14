'use client';

import type { ReactNode } from 'react';

import { useForm } from '@/shared/lib/forms';
import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Title } from '@/shared/ui/kit/title';

import { userAccountSchema } from '../lib';
import { updateUser, useUserStore } from '../services';

export function UserSettings() {
  const { user, setUser } = useUserStore();

  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
    },
    validators: {
      onChange: userAccountSchema,
    },
    onSubmit: async ({ value }) => {
      const updatedFields: Partial<typeof value> = {};

      (Object.keys(value) as Array<keyof typeof value>).forEach(key => {
        if (value[key] !== user?.[key]) {
          updatedFields[key] = value[key];
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        const res = await updateUser(updatedFields);

        if (res.statusCode === 200) {
          setUser(res.data);
          notifySuccess('User updated successfully');
        } else {
          notifyDanger('Failed to update user');
        }
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
      className="w-full flex flex-col gap-5"
    >
      <UserFormLayout>
        <div className="min-w-[200px]">
          <Title level={4}>Personal Info</Title>
        </div>
        <div className="flex items-center gap-3 flex-1 w-full justify-between">
          <Field name="firstName">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="First Name"
                placeholder="John"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
                variant="bordered"
                fullWidth
              />
            )}
          </Field>
          <Field name="lastName">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="Last Name"
                placeholder="Doe"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
                variant="bordered"
                fullWidth
              />
            )}
          </Field>
        </div>
      </UserFormLayout>
      <div className="w-full h-0.5 bg-stroke-color" />
      <UserFormLayout>
        <div className="min-w-[200px]">
          <Title level={4}>Username & Email</Title>
        </div>
        <div className="flex items-center gap-3 flex-1 w-full justify-between">
          <Field name="username">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="Username"
                placeholder="john.doe"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
                variant="bordered"
                fullWidth
              />
            )}
          </Field>
          <Field name="email">
            {field => (
              <Input
                id={field.name}
                name={field.name}
                label="Email"
                placeholder="johndoe@example.com"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.map(err => err?.message)}
                isInvalid={!!field.state.meta.errors.length}
                variant="bordered"
                fullWidth
              />
            )}
          </Field>
        </div>
      </UserFormLayout>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            color="primary"
            disabled={!canSubmit}
            className="w-[57.5%] ml-auto mt-5"
          >
            {isSubmitting ? '...' : 'Update'}
          </Button>
        )}
      </Subscribe>
    </Form>
  );
}

function UserFormLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex items-center gap-[30%] justify-between w-full">
      {children}
    </section>
  );
}
