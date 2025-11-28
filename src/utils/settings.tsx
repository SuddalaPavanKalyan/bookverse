import {
  Bell,
  Building2,
  Clock,
  FileText,
  Heart,
  Moon,
  Settings,
  ShieldCheck,
  User,
  Wifi,
} from "lucide-react";
import { type ReactElement } from "react";

export interface SettingsLink {
  section?: string;
  label?: string;
  icon?: ReactElement;
  path?: string;
}

export const settingsLinks: SettingsLink[] = [
  {
    label: "Public profile",
    icon: <User size={16} />,
    path: "/settings/profile/",
  },
  {
    label: "Account",
    icon: <Settings size={16} />,
    path: "/settings/account/",
  },
  {
    label: "Appearance",
    icon: <Moon size={16} />,
    path: "/settings/appearance/",
  },
  {
    label: "Accessibility",
    icon: <Bell size={16} />,
    path: "/settings/accessibility/",
  },
  {
    label: "Notifications",
    icon: <Bell size={16} />,
    path: "/settings/notifications/",
  },

  { section: "Access" },
  {
    label: "Billing and licensing",
    icon: <Building2 size={16} />,
    path: "/settings/billing/",
  },
  {
    label: "Emails",
    icon: <Wifi size={16} />,
    path: "/settings/emails/",
  },
  {
    label: "Password and authentication",
    icon: <ShieldCheck size={16} />,
    path: "/settings/security/",
  },
  {
    label: "Sessions",
    icon: <Wifi size={16} />,
    path: "/settings/sessions/",
  },
  {
    label: "Moderation",
    icon: <ShieldCheck size={16} />,
    path: "/settings/moderation/",
  },

  { section: "Security" },
  {
    label: "Your security",
    icon: <ShieldCheck size={16} />,
    path: "/settings/security-analysis/",
  },

  { section: "Integrations" },
  {
    label: "Scheduled reminders",
    icon: <Clock size={16} />,
    path: "/settings/reminders/",
  },

  { section: "Archives" },
  {
    label: "Security log",
    icon: <FileText size={16} />,
    path: "/settings/security-log/",
  },
  {
    label: "Sponsorship log",
    icon: <Heart size={16} />,
    path: "/settings/sponsorship-log/",
  },
];
