import { CreateView, Greeting } from '@/widgets/home';

export default async function Home() {
  return (
    <main className="flex flex-col gap-3">
      <Greeting />
      <CreateView />
    </main>
  );
}
