import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { DataTable, TableAction } from '@/components/tables';
import { TableColumn } from '@/hooks/useTable';
import { Agent } from '@/types/agent.types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data - replace with real data from API
  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Agente de Ventas',
      description: 'Agente especializado en atención al cliente y ventas',
      channel: 'whatsapp',
      channelType: 'incoming',
      language: 'spanish',
      toolsCount: 3,
      variablesCount: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Asistente Virtual',
      description: 'Agente para llamadas telefónicas automatizadas',
      channel: 'calls',
      channelType: 'outgoing',
      language: 'english',
      toolsCount: 2,
      variablesCount: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Soporte Técnico',
      description: 'Agente para resolver problemas técnicos básicos',
      channel: 'whatsapp',
      channelType: 'incoming',
      language: 'spanish',
      toolsCount: 5,
      variablesCount: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const columns: TableColumn<Agent>[] = [
    {
      key: 'name',
      title: t('agents.name'),
      sortable: true,
      render: (value, item) => (
        <div className="font-medium text-foreground">{value}</div>
      )
    },
    {
      key: 'description',
      title: t('agents.description_field'),
      render: (value) => (
        <div className="max-w-xs truncate text-muted-foreground">{value}</div>
      )
    },
    {
      key: 'channel',
      title: t('agents.channel'),
      sortable: true,
      render: (value) => (
        <Badge variant="outline">
          {value === 'whatsapp' ? t('channel.whatsapp') : t('channel.calls')}
        </Badge>
      )
    },
    {
      key: 'channelType',
      title: t('agents.channel_type'),
      render: (value) => (
        <Badge variant="secondary">
          {value === 'incoming' ? t('channel_type.incoming') : t('channel_type.outgoing')}
        </Badge>
      )
    },
    {
      key: 'toolsCount',
      title: t('agents.tools_count'),
      sortable: true,
      render: (value) => (
        <div className="text-center">{value}</div>
      )
    },
    {
      key: 'variablesCount',
      title: t('agents.variables_count'),
      sortable: true,
      render: (value) => (
        <div className="text-center">{value}</div>
      )
    }
  ];

  const actions: TableAction[] = [
    {
      id: 'edit',
      label: t('actions.edit'),
      icon: Edit,
      variant: 'outline',
      onClick: (agent) => {
        navigate(`/agents/edit/${agent.id}`);
      }
    },
    {
      id: 'view',
      label: t('agents.view_detail'),
      icon: Eye,
      variant: 'secondary',
      onClick: (agent) => {
        navigate(`/agents/view/${agent.id}`);
      }
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('sidebar.agents')}
            </h1>
            <p className="text-muted-foreground">
              {t('agents.description')}
            </p>
          </div>
          <Button onClick={() => navigate('/agents/create')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('agents.create')}
          </Button>
        </div>

        <DataTable
          data={mockAgents}
          columns={columns}
          actions={actions}
          searchPlaceholder={`${t('actions.search')} ${t('sidebar.agents').toLowerCase()}...`}
          title={t('agents.title')}
          description={t('agents.description')}
        />
      </div>
    </DashboardLayout>
  );
};