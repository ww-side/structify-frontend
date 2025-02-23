import { cookies } from 'next/headers';

export default async function Home() {
  const serverCookies = await cookies();
  console.log('Server Cookies:', serverCookies.getAll());

  return <main>App</main>;
}
