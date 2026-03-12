export type NavigationItem = {
  title: string;
  to: string;
  icon: string;
  description?: string;
};

export const navigationItems: NavigationItem[] = [
  { title: '首页', to: '/home', icon: 'mdi-home-outline' },
];
