export type NavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type NavUser = {
  name: string;
  initials: string;
};
