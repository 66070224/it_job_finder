import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CompanySidebar } from "./_components/company-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <CompanySidebar />
        <SidebarInset>
          <div className="flex-1 p-2"></div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
