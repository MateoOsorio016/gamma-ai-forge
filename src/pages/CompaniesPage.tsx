import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Building2, Crown, Zap, Users, ArrowRight } from 'lucide-react';
import { Company } from '@/types/common.types';

const planIcons = {
  basic: Users,
  pro: Zap,
  enterprise: Crown,
};

const planColors = {
  basic: 'bg-blue-500/10 text-blue-600 border-blue-200',
  pro: 'bg-gamma-neon/10 text-gamma-dark border-gamma-neon/30',
  enterprise: 'bg-purple-500/10 text-purple-600 border-purple-200',
};

export const CompaniesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, selectCompany } = useAuth();

  const handleCompanySelect = (company: Company) => {
    selectCompany(company);
    navigate(ROUTES.DASHBOARD);
  };

  if (!user) {
    navigate(ROUTES.LOGIN);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Logo size="md" />
          <div className="text-sm text-muted-foreground">
            {t('welcome', 'Bienvenido')}, {user.name}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-primary">
              {t('companies.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('companies.subtitle')}
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.companies.map((company) => {
              const PlanIcon = planIcons[company.plan];
              
              return (
                <Card 
                  key={company.id}
                  className="group relative bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleCompanySelect(company)}
                >
                  <CardHeader className="space-y-4">
                    {/* Company Icon */}
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>

                    {/* Company Info */}
                    <div className="text-center space-y-2">
                      <CardTitle className="text-xl group-hover:text-gamma-neon transition-colors">
                        {company.name}
                      </CardTitle>
                      {company.description && (
                        <CardDescription>
                          {company.description}
                        </CardDescription>
                      )}
                    </div>

                    {/* Plan Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary"
                        className={`gap-2 ${planColors[company.plan]}`}
                      >
                        <PlanIcon className="h-3 w-3" />
                        {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button 
                      className="w-full group-hover:bg-gamma-neon group-hover:text-gamma-dark transition-colors"
                      variant="outline"
                    >
                      {t('companies.enter')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>

                  {/* Status Indicator */}
                  {company.isActive && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full shadow-neon"></div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {t('companies.help', '¿Necesitas acceso a una nueva empresa? Contacta a tu administrador.')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};