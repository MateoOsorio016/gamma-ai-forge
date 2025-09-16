import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Sparkles } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {t('sidebar.analytics')}
          </h1>
          <p className="text-muted-foreground">
            {t('analytics.description', 'Análisis y métricas de rendimiento')}
          </p>
        </div>

        <Card className="bg-gradient-accent border-gamma-neon/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gamma-neon rounded-full">
                <BarChart3 className="h-6 w-6 text-gamma-dark" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gamma-dark">
                  {t('analytics.coming_soon', 'Módulo de Analíticas - Próximamente')}
                </h3>
                <p className="text-sm text-gamma-dark/80">
                  {t('analytics.construction', 'Dashboards avanzados con métricas en tiempo real')}
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-gamma-dark/60 ml-auto animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};