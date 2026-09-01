export interface NavItem {
  label: string;
  href: string;
  tag?: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Engineering", href: "#engineering", tag: "01" },
  { label: "AI Systems", href: "#ai-systems", tag: "02" },
  { label: "Capabilities", href: "#capabilities", tag: "03" },
  { label: "Studio", href: "#studio", tag: "04" },
];
