import {
  LayoutDashboard,
  BarChart2,
  User,
  Crown,
  MessageCircle,
} from "lucide-react";
import { NavigationItem } from "./types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Analytics",
    path: "/dashboard/report",
    icon: BarChart2,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Upgrade to Pro",
    path: "/dashboard/Payments",
    icon: Crown,
  },
  {
    title: "Feedback",
    path: "/dashboard/feedback",
    icon: MessageCircle,
  },
];

export type NavigationPath = (typeof navigationItems)[number]["path"];
