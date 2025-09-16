import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { Settings, User, Palette, Globe } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {t('sidebar.settings')}
          </h1>
          <p className="text-muted-foreground">
            {t('settings.description', 'Configura tu perfil y preferencias')}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>{t('settings.profile')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t('settings.profile_description', 'Información personal y configuración de cuenta')}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t('profile.name', 'Nombre')}</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    {user?.name || 'N/A'}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('profile.email', 'Email')}</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    {user?.email || 'N/A'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Palette className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle>{t('settings.appearance')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t('settings.appearance_description', 'Personaliza la apariencia de la aplicación')}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">{t('settings.theme')}</Label>
                  <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t('theme.light')}</SelectItem>
                      <SelectItem value="dark">{t('theme.dark')}</SelectItem>
                      <SelectItem value="system">{t('theme.system')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">{t('settings.language')}</Label>
                  <Select value={i18n.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Settings className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle>{t('settings.system', 'Sistema')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t('settings.system_description', 'Configuraciones generales del sistema')}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  {t('settings.system_coming_soon', 'Configuraciones adicionales próximamente')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};