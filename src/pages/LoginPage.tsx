import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast({
        title: t('login.success', 'Inicio de sesión exitoso'),
        description: t('login.welcome', 'Bienvenido de vuelta'),
      });
      navigate(ROUTES.COMPANIES);
    } catch (error) {
      toast({
        title: t('login.error', 'Error de inicio de sesión'),
        description: t('login.invalid', 'Credenciales inválidas'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gamma-light/5 to-gamma-neon/10 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={handleBack}
        className="absolute top-8 left-8 gap-2 hover:bg-accent/10 z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back', 'Volver')}
      </Button>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <Logo size="xl" className="justify-center" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Bienvenido de vuelta
            </h1>
            <p className="text-muted-foreground">
              Accede a tu plataforma de agentes IA
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-strong">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-primary">
              {t('login.title', 'Iniciar Sesión')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('login.email', 'Correo electrónico')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nombre@empresa.com"
                    required
                    disabled={isLoading}
                    className="pl-10 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20 h-12"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t('login.password', 'Contraseña')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••••"
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, remember: !!checked }))
                    }
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t('login.remember', 'Recordarme')}
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-accent hover:text-accent/80"
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-gamma-dark to-gamma-dark/90 hover:from-gamma-dark/90 hover:to-gamma-dark/80 text-white font-medium transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Accediendo...' : t('login.submit', 'Iniciar Sesión')}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Acceso de prueba
                </span>
              </div>
            </div>

            {/* Demo Credentials */}
            <Card className="bg-accent/5 border border-accent/20">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-medium text-accent">Credenciales de Demo</h4>
                  <p className="text-xs text-muted-foreground">
                    Usa cualquier email válido y contraseña para acceder al sistema
                  </p>
                  <div className="text-xs text-accent/80 space-y-1">
                    <div>📧 demo@gamma.ai</div>
                    <div>🔑 password123</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
            Contáctanos para acceso
          </Button>
        </p>
      </div>
    </div>
  );
};