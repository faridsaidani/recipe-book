// import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { List, BookOpen, Users, User } from "lucide-react";

const items = [
  {
    title: "My Ingredients",
    section: "ingredients",
    icon: List,
  },
  {
    title: "My Recipes",
    section: "recipes",
    icon: BookOpen,
  },
  {
    title: "Community",
    section: "community",
    icon: Users,
  },
  {
    title: "Profile",
    section: "profile",
    icon: User,
  },
];

interface AppSidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export function AppSidebar({
  setActiveSection,
  activeSection,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent className="bg-customGreen2 text-customGray font-bold">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-lg">
            My Profile
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`rounded-lg ${
                    activeSection === item.section
                      ? "bg-white text-gray-700"
                      : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <a href="#" onClick={() => setActiveSection(item.section)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
