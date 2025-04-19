'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Skeleton } from '@/shared/ui/kit/skeleton';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import { AuthLoading } from './auth-loading';

const Logo = dynamic(
  () => import('@/shared/ui/components/logo').then(m => m.Logo),
  {
    loading: () => <Skeleton width={169} height={45} />,
  },
);
const SignInForm = dynamic(
  () => import('./sign-in-form').then(m => m.SignInForm),
  {
    loading: () => <AuthLoading />,
  },
);
const SignUpForm = dynamic(
  () => import('./sign-up-form').then(m => m.SignUpForm),
  {
    loading: () => <AuthLoading rows={6} />,
  },
);

export function AuthForm() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <section className="w-full rounded-md px-[10%]">
      <Logo />
      <Title>
        {isSignIn
          ? 'Welcome back! Please Sign in to continue.'
          : 'Join us and never miss a thing - SIGN UP!'}
      </Title>
      <Text>
        By signing up, you will gain access to exclusive content, special
        offers, and be the first to hear about exciting news and updates.
      </Text>
      <section className="my-3">
        {isSignIn ? (
          <SignInForm />
        ) : (
          <SignUpForm onSuccess={() => setIsSignIn(true)} />
        )}
      </section>
      <Text>
        {isSignIn ? 'Don’t have an account?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </Text>
    </section>
  );
}
