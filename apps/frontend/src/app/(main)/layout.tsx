import Navbar from "@/components/web/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="max-w-screen mx-auto w-full">
      <Navbar />
      {children}
      </main>
  );
}
