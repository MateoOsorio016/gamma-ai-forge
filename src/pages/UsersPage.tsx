import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Sparkles } from 'lucide-react';

export const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {t('sidebar.users')}
          </h1>
          <p className="text-muted-foreground">
            {t('users.description', 'Gestión de usuarios y permisos')}
          </p>
        </div>

        <Card className="bg-gradient-accent border-gamma-neon/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gamma-neon rounded-full">
                <Users className="h-6 w-6 text-gamma-dark" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gamma-dark">
                  {t('users.coming_soon', 'Módulo de Usuarios - Próximamente')}
                </h3>
                <p className="text-sm text-gamma-dark/80">
                  {t('users.construction', 'Control de acceso y gestión de roles avanzada')}
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