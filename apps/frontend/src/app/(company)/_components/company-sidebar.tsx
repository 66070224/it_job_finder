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
  
    <SidebarContent className="px-3 py-4 bg-secondary-foreground space-y-4">
      <Logo className="text-white"/>
      <SidebarGroup>
        <SidebarMenu className="space-y-3 text-white">
  
          <SidebarMenuItem>
            <SidebarMenuButton>
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
  
    <SidebarFooter className="p-3 bg-secondary-foreground text-white">
      <SidebarMenuButton>
        <LogOut />
        <span>ออกจากระบบ</span>
      </SidebarMenuButton>
    </SidebarFooter>
  </Sidebar>);
}