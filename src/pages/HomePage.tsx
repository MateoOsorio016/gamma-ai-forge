import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { ROUTES } from '@/constants/routes';
import { Moon, Sun, Languages, Sparkles, Zap, Bot } from 'lucide-react';
import { useTheme } from 'next-themes';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Logo size="lg" />
          
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">
                {i18n.language.toUpperCase()}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('home.subtitle')}
            </p>
            
            {/* Construction Badge */}
            <Card className="inline-block bg-accent/20 border-accent shadow-soft">
              <CardContent className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent rounded-full">
                    <Sparkles className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-accent-foreground">
                      {t('home.construction')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('home.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="w-12 h-12 bg-gamma-neon rounded-full flex items-center justify-center mx-auto">
                  <Bot className="h-6 w-6 text-gamma-dark" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t('features.ai_agents', 'Agentes IA Inteligentes')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.ai_description', 'Crea y gestiona agentes de inteligencia artificial avanzados')}
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="w-12 h-12 bg-gamma-neon rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-gamma-dark" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t('features.integrations', 'Integraciones Potentes')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.integrations_description', 'Conecta con tus herramientas y servicios favoritos')}
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="w-12 h-12 bg-gamma-neon rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6 text-gamma-dark" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t('features.analytics', 'Análisis Avanzados')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.analytics_description', 'Obtén insights detallados del rendimiento de tus agentes')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="pt-8">
            <Button 
              onClick={handleLogin}
              size="lg"
              className="text-lg px-8 py-6 bg-gamma-dark hover:bg-gamma-dark/90 text-white shadow-strong animate-pulse-neon"
            >
              {t('home.cta')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};