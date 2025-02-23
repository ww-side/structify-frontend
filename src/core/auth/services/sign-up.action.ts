'use server';

export async function signUp(args: {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/auth/sign-up`, {
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result: { statusCode: number; message: string } = await res.json();
    return result;
  } catch (e) {
    console.error('Error signing up', e);
  }
}
