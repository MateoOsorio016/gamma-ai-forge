import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Users, Zap, BarChart3 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description }) => (
  <Card className="bg-card/50 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const StatsGrid: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('stats.agents', 'Agentes Activos'),
      value: '--',
      icon: Bot,
      description: t('stats.coming_soon', 'Próximamente'),
    },
    {
      title: t('stats.users', 'Usuarios'),
      value: '--',
      icon: Users,
      description: t('stats.coming_soon', 'Próximamente'),
    },
    {
      title: t('stats.integrations', 'Integraciones'),
      value: '--',
      icon: Zap,
      description: t('stats.coming_soon', 'Próximamente'),
    },
    {
      title: t('stats.analytics', 'Análisis'),
      value: '--',
      icon: BarChart3,
      description: t('stats.coming_soon', 'Próximamente'),
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};