'use client';

import { useState } from 'react';

import { Logo } from '@/shared/ui/components/logo';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';

export function AuthForm() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <section className="bg-white w-full rounded-md px-[10%]">
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
