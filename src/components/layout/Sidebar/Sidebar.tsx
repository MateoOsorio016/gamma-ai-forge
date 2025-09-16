import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import {
  BarChart3,
  Bot,
  Settings,
  Users,
  Zap,
  LayoutDashboard,
} from 'lucide-react';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'sidebar.overview',
    url: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'sidebar.agents',
    url: ROUTES.AGENTS,
    icon: Bot,
  },
  {
    title: 'sidebar.analytics',
    url: ROUTES.ANALYTICS,
    icon: BarChart3,
  },
  {
    title: 'sidebar.integrations',
    url: ROUTES.INTEGRATIONS,
    icon: Zap,
  },
  {
    title: 'sidebar.users',
    url: ROUTES.USERS,
    icon: Users,
  },
  {
    title: 'sidebar.settings',
    url: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarBase
      className="border-r"
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            {t('sidebar.navigation', 'Navegación')}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'w-full justify-start transition-colors',
                      isActive(item.url) && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{t(item.title)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarBase>
  );
};