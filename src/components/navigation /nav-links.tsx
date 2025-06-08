"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  title: string;
}

export function NavLink({ href, icon: Icon, title }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={title}
        className="flex items-center gap-4 px-4 py-2.5 text-base rounded-lg transition-colors group-data-[collapsible=icon]:justify-center"
      >
        <Link
          href={href}
          className={cn(
            "flex items-center gap-4 w-full",
            isActive && "text-primary font-medium"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6 transition-all duration-300 ease-in-out",
              "group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:pl-1 group-data-[collapsible=icon]:w-8",
              isActive && "text-primary"
            )}
          />
          <span className="text-base transition-all duration-300 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0">
            {title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
