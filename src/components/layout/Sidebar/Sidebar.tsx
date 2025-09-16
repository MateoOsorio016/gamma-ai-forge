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
  Building2,
  ChevronRight,
  Crown,
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
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/Logo';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
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
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarBase
      className="border-r border-border/50 bg-sidebar/50 backdrop-blur-xl"
      collapsible="icon"
    >
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <Logo size={state === 'collapsed' ? 'sm' : 'md'} showText={state !== 'collapsed'} />
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {state !== 'collapsed' && t('sidebar.navigation', 'Navegación')}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'w-full justify-start transition-all duration-200 hover:bg-accent/10 group',
                      isActive(item.url) && 'bg-accent/20 text-accent-foreground font-medium border-r-2 border-accent'
                    )}
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-md"
                    >
                      <item.icon className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive(item.url) ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                      )} />
                      {state !== 'collapsed' && (
                        <>
                          <span className="truncate">{t(item.title)}</span>
                          <ChevronRight className={cn(
                            "ml-auto h-3 w-3 transition-transform opacity-0 group-hover:opacity-100",
                            isActive(item.url) && "opacity-100"
                          )} />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Company Section */}
        {state !== 'collapsed' && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Empresa Actual
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-3">
              <div className="bg-card/50 border border-border/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-md flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Acme Corp</p>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* User Profile Footer */}
      {user && (
        <SidebarFooter className="border-t border-border/50 p-3">
          {state !== 'collapsed' ? (
            <div className="bg-card/30 border border-border/50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-accent/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-accent text-accent-foreground font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8 border-2 border-accent/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-accent text-accent-foreground font-medium text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </SidebarFooter>
      )}
    </SidebarBase>
  );
};