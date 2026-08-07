import Navbar from "@/components/web/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 mx-auto w-full">
      <Navbar />
      {children}
      <footer className="text-sm text-muted-foreground bg-secondary-foreground p-3">
        <p>2026 ITJob - Job platform for IT professionals</p>
      </footer>
    </main>
  );
}
