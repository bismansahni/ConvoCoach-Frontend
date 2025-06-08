"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigationItems } from "@/lib/navigation";

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg px-4 py-3 mb-2">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.path
            : pathname.startsWith(item.path);

          const Icon = item.icon;

          return (
            <SidebarMenuItem
              key={item.path}
              className="group-data-[collapsible=icon]:p"
            >
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "flex items-center gap-4 px-4 py-2.5 text-base rounded-md transition-all duration-200",
                  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 ",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "hover:bg-muted/50"
                )}
              >
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-4 w-full",
                    "group-data-[collapsible=icon]:justify-center"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                      "group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5"
                    )}
                  />
                  <span
                    className={cn(
                      "truncate transition-opacity duration-200",
                      "group-data-[collapsible=icon]:hidden",
                      isActive && "font-medium"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
