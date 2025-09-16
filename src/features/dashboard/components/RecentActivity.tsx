import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'login';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'Juan Pérez' },
    action: 'creó un nuevo agente',
    target: 'Agente de Ventas',
    timestamp: 'Hace 5 minutos',
    type: 'create',
  },
  {
    id: '2',
    user: { name: 'María García' },
    action: 'actualizó la integración',
    target: 'Slack Workspace',
    timestamp: 'Hace 15 minutos',
    type: 'update',
  },
  {
    id: '3',
    user: { name: 'Carlos López' },
    action: 'inició sesión en',
    target: 'Dashboard',
    timestamp: 'Hace 30 minutos',
    type: 'login',
  },
  {
    id: '4',
    user: { name: 'Ana Martínez' },
    action: 'eliminó el agente',
    target: 'Bot de Prueba',
    timestamp: 'Hace 1 hora',
    type: 'delete',
  },
];

const getActivityColor = (type: ActivityItem['type']) => {
  const colors = {
    create: 'bg-green-100 text-green-800',
    update: 'bg-blue-100 text-blue-800',
    delete: 'bg-red-100 text-red-800',
    login: 'bg-gray-100 text-gray-800',
  };
  return colors[type] || colors.login;
};

export const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>
                  {activity.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getActivityColor(activity.type)}`}
                  >
                    {activity.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};