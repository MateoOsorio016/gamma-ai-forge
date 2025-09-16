import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { ROUTES } from '@/constants/routes';
import { Moon, Sun, Languages, Sparkles, Zap, Bot, Shield, Users, BarChart3, ArrowRight, Play } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-gamma-light/5 to-gamma-neon/10">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex h-20 items-center justify-between">
          <Logo size="lg" />
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 hover:bg-accent/10"
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">
                {i18n.language.toUpperCase()}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:bg-accent/10"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button 
              onClick={handleLogin}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              {t('home.cta', 'Acceder')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamma-dark/5 via-transparent to-gamma-neon/5 animate-pulse-neon"></div>
        
        <div className="container mx-auto px-6 py-24 lg:py-32 text-center relative">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-accent">Próximamente - En Desarrollo</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Gamma AI
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                La plataforma más avanzada para crear, gestionar y desplegar agentes de inteligencia artificial que revolucionarán tu negocio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleLogin}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-gamma-dark to-gamma-dark/90 hover:from-gamma-dark/90 hover:to-gamma-dark/80 text-white shadow-strong group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 border-accent/30 hover:border-accent hover:bg-accent/5"
              >
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-transparent to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Tecnología de Vanguardia
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Construye el futuro de la inteligencia artificial con herramientas profesionales y escalables.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-soft hover:shadow-strong transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Agentes IA Inteligentes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crea agentes conversacionales avanzados con capacidades de aprendizaje y razonamiento natural.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-soft hover:shadow-strong transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Integraciones Potentes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conecta sin límites con APIs, servicios web y herramientas existentes en tu ecosistema empresarial.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-soft hover:shadow-strong transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-gamma-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gamma-neon to-gamma-neon/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-gamma-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Análisis Avanzados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Obtén métricas detalladas, insights en tiempo real y reportes completos del rendimiento de tus agentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-gamma-dark/5 to-gamma-neon/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-accent">500+</div>
              <div className="text-muted-foreground">Agentes Creados</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Uptime Garantizado</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-gamma-neon">24/7</div>
              <div className="text-muted-foreground">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2024 Gamma AI. Construyendo el futuro de la inteligencia artificial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};