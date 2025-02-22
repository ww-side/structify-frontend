import { AuthForm } from '@/core/auth/components';

import { AuthFormLayout } from '@/widgets/auth/auth-form-layout';
import { VideoLoop } from '@/widgets/auth/video-loop';

export default function Auth() {
  return (
    <main className="relative flex h-screen overflow-hidden">
      <AuthFormLayout>
        <AuthForm />
      </AuthFormLayout>
      <VideoLoop />
    </main>
  );
}
