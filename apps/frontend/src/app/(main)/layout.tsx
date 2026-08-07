import Navbar from "@/components/web/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex-col mx-auto w-full max-w-screen-3xl">{children}</div>
      
      <footer className="text-sm text-muted-foreground bg-secondary-foreground p-3">
        <p>2026 ITJob - Job platform for IT professionals</p>
      </footer>
    </main>
  );
}
