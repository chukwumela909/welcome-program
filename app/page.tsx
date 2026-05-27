import { EventHero } from "./components/EventHero";
import { RegistrationPanel } from "./components/RegistrationPanel";

export default function Page() {
  return (
    <main className="grid min-h-dvh overflow-x-hidden lg:grid-cols-[5fr_7fr]">
      <EventHero />
      <RegistrationPanel />
    </main>
  );
}
