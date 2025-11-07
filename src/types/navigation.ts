// types/navigation.ts
export interface NavItem {
  id: string;
  label: string;
  href: string;
  img?: string;
}

export type NavigationItems = NavItem[];