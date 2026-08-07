import { Logo } from "@/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { FileText, LayoutDashboard, LogOut, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

export function CompanySidebar() { 
  return (<Sidebar className="max-h-screen" >
    <SidebarHeader className="p-4 border-b border-sidebar-border">
      <Logo />
    </SidebarHeader>
  
    <SidebarContent className="px-3 py-4">
      <SidebarGroup>
        <SidebarMenu className="space-y-3">
  
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <LayoutDashboard />
              <Link href="/company-dashboard"><span>แดชบอร์ด</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
  
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FileText />
              <span>ประกาศงานของฉัน</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
  
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users />
              <span>ผู้สมัครทั้งหมด</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
  
          <SidebarMenuItem>
            <SidebarMenuButton>
              <MessageCircle />
              <span>ข้อความ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  
    <SidebarFooter className="p-3">
      <SidebarMenuButton>
        <LogOut />
        <span>ออกจากระบบ</span>
      </SidebarMenuButton>
    </SidebarFooter>
  </Sidebar>);
}