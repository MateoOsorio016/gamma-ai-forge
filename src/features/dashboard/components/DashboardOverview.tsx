import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/charts';
import { Bot, Users, Zap, TrendingUp, Activity, Clock } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Agentes Activos"
          value="24"
          description="Agentes en funcionamiento"
          icon={Bot}
          trend={{
            value: 12,
            label: "vs mes anterior",
            isPositive: true,
          }}
        />
        
        <StatCard
          title="Usuarios"
          value="1,234"
          description="Usuarios registrados"
          icon={Users}
          trend={{
            value: 5,
            label: "vs mes anterior",
            isPositive: true,
          }}
        />
        
        <StatCard
          title="Integraciones"
          value="18"
          description="Servicios conectados"
          icon={Zap}
          trend={{
            value: 3,
            label: "nuevas este mes",
            isPositive: true,
          }}
        />
        
        <StatCard
          title="Rendimiento"
          value="99.2%"
          description="Uptime promedio"
          icon={TrendingUp}
          trend={{
            value: 0.5,
            label: "vs mes anterior",
            isPositive: true,
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Nuevo agente creado</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <div className="h-2 w-2 bg-accent rounded-full"></div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Integración actualizada</p>
                  <p className="text-xs text-muted-foreground">Hace 4 horas</p>
                </div>
                <div className="h-2 w-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Nuevo usuario registrado</p>
                  <p className="text-xs text-muted-foreground">Hace 6 horas</p>
                </div>
                <div className="h-2 w-2 bg-accent rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tareas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Revisar configuración de agente</p>
                  <p className="text-xs text-muted-foreground">Vence hoy</p>
                </div>
                <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Urgente
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Actualizar integración</p>
                  <p className="text-xs text-muted-foreground">Vence mañana</p>
                </div>
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Normal
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Entrenar modelo IA</p>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Baja
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};