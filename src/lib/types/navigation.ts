import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
  exact?: boolean;
}
