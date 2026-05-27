import type { ReactNode } from "react";

export const metadata = {
  title: "Admin · TFN Kenya",
  robots: { index: false, follow: false },
};

export default function DashboardAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh px-6 py-10 sm:px-10 lg:px-16">
      <header className="mx-auto mb-10 flex max-w-7xl items-baseline justify-between">
        <h1 className="font-display text-3xl tracking-tight">
          Admin · <span className="text-brand-gradient">TFN Kenya</span>
        </h1>
        <p className="text-xs uppercase tracking-widest text-muted">
          Registrations dashboard
        </p>
      </header>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
