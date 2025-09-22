import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { DataTable } from '@/components/tables';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserPlus } from 'lucide-react';

// Datos de ejemplo para demostrar la tabla
const sampleUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-01-15',
    department: 'IT'
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@email.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-20',
    department: 'Marketing'
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    role: 'Manager',
    status: 'inactive',
    createdAt: '2024-02-01',
    department: 'Sales'
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    role: 'User',
    status: 'pending',
    createdAt: '2024-02-10',
    department: 'HR'
  },
  {
    id: '5',
    name: 'Pedro Rodríguez',
    email: 'pedro.rodriguez@email.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-02-15',
    department: 'IT'
  },
  {
    id: '6',
    name: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-02-20',
    department: 'Design'
  },
  {
    id: '7',
    name: 'Miguel Torres',
    email: 'miguel.torres@email.com',
    role: 'Manager',
    status: 'active',
    createdAt: '2024-02-25',
    department: 'Operations'
  },
];

export const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'name' as const,
      title: 'Nombre',
      sortable: true,
      render: (value: string, user: any) => (
        <div className="font-medium">{value}</div>
      )
    },
    {
      key: 'email' as const,
      title: 'Email',
      sortable: true,
    },
    {
      key: 'role' as const,
      title: 'Rol',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'Admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status' as const,
      title: 'Estado',
      sortable: true,
      render: (value: string) => {
        const variants = {
          active: 'default',
          inactive: 'destructive', 
          pending: 'outline'
        };
        return (
          <Badge variant={variants[value as keyof typeof variants] as any}>
            {value === 'active' ? 'Activo' : value === 'inactive' ? 'Inactivo' : 'Pendiente'}
          </Badge>
        );
      }
    },
    {
      key: 'department' as const,
      title: 'Departamento',
      sortable: true,
    },
    {
      key: 'createdAt' as const,
      title: 'Fecha de registro',
      sortable: true,
    }
  ];

  const actions = [
    {
      id: 'view',
      label: 'Ver detalles',
      icon: Eye,
      variant: 'outline' as const,
      onClick: (user: any) => {
        console.log('Ver usuario:', user);
      }
    },
    {
      id: 'edit',
      label: 'Editar',
      icon: Edit,
      variant: 'default' as const,
      onClick: (user: any) => {
        console.log('Editar usuario:', user);
      }
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (user: any) => {
        console.log('Eliminar usuario:', user);
      }
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {t('sidebar.users')}
            </h1>
            <p className="text-muted-foreground">
              Gestiona los usuarios y sus permisos en el sistema
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Agregar Usuario
          </Button>
        </div>
        
        <DataTable
          data={sampleUsers}
          columns={columns}
          actions={actions}
          title="Lista de Usuarios"
          description="Gestiona los usuarios del sistema y sus roles"
          searchPlaceholder="Buscar usuarios..."
          emptyMessage="No se encontraron usuarios"
          pageSize={5}
        />
      </div>
    </DashboardLayout>
  );
};