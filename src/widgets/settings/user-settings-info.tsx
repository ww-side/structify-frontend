'use client';

import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

export function UserSettingsInfo() {
  return (
    <section className="mb-9">
      <Title level={4}>Account Settings</Title>
      <Text>Update your photo and personal details here</Text>
    </section>
  );
}
