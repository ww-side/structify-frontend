import { CalendarNavigation, CreateView, Greeting } from '@/widgets/home';

export default async function Home() {
  return (
    <main className="flex flex-col gap-3">
      <Greeting />
      <section className="flex flex-wrap gap-3">
        <CreateView />
        <CalendarNavigation />
      </section>
    </main>
  );
}
