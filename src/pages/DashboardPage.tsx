import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout';
import { useAuth } from '@/hooks/useAuth';
import { Bot, Users, Zap, BarChart3, Sparkles, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { selectedCompany } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">
              {t('dashboard.title')}
            </h1>
            {selectedCompany && (
              <Badge variant="secondary" className="gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {selectedCompany.name}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {selectedCompany?.description || t('dashboard.welcome', 'Bienvenido a tu panel de control')}
          </p>
        </div>

        {/* Construction Notice */}
        <Card className="bg-gradient-accent border-gamma-neon/20 shadow-neon">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gamma-neon rounded-full">
                <Sparkles className="h-6 w-6 text-gamma-dark animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gamma-dark">
                  {t('dashboard.construction')}
                </h3>
                <p className="text-sm text-gamma-dark/80">
                  {t('dashboard.description')}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gamma-dark/60 ml-auto" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('stats.agents', 'Agentes Activos')}
              </CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                {t('stats.coming_soon', 'Próximamente')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('stats.users', 'Usuarios')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                {t('stats.coming_soon', 'Próximamente')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('stats.integrations', 'Integraciones')}
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                {t('stats.coming_soon', 'Próximamente')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('stats.analytics', 'Análisis')}
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                {t('stats.coming_soon', 'Próximamente')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.recent_activity', 'Actividad Reciente')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>{t('dashboard.no_activity', 'No hay actividad reciente')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quick_actions', 'Acciones Rápidas')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  {t('dashboard.module_placeholder', 'Los módulos estarán disponibles próximamente')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};