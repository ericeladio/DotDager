export interface ServiceCardProps {
  title: string;
  description: string;
}

export interface StatCardProps {
  value: string;
  label: string;
}

export interface NavigationItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}
