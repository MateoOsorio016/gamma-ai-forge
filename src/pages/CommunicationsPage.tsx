import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { DataTable } from '@/components/tables';
import { TableColumn } from '@/hooks/useTable';
import { Communication } from '@/types/communication.types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export const CommunicationsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get('schedule');

  // Mock data - replace with real API call
  const mockCommunications: Communication[] = [
    {
      id: 3,
      created_at: "2025-09-29T20:30:38.813820Z",
      updated_at: "2025-09-29T20:30:38.813820Z",
      status: true,
      identify: null,
      agent_number: "",
      duration: null,
      sentiments: null,
      transcription: null,
      recording: null,
      summary: null,
      suggestions: null,
      obtained_variables: null,
      date: null,
      start_time: null,
      end_time: null,
      medium: 1,
      comunication_type: 2,
      order: 1,
      agent: 2,
      recipients: [1],
      schedule: [8]
    }
  ];

  const columns: TableColumn<Communication>[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      render: (value) => (
        <div className="font-medium text-foreground">#{value}</div>
      )
    },
    {
      key: 'status',
      title: t('communications.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? t('communications.active') : t('communications.inactive')}
        </Badge>
      )
    },
    {
      key: 'agent_number',
      title: t('communications.agent_number'),
      render: (value) => (
        <div className="text-muted-foreground">{value || '-'}</div>
      )
    },
    {
      key: 'duration',
      title: t('communications.duration'),
      sortable: true,
      render: (value) => (
        <div className="text-muted-foreground">
          {value ? `${value}s` : '-'}
        </div>
      )
    },
    {
      key: 'comunication_type',
      title: t('communications.type'),
      render: (value) => (
        <Badge variant="outline">
          {value === 1 ? t('communications.type_incoming') : t('communications.type_outgoing')}
        </Badge>
      )
    },
    {
      key: 'created_at',
      title: t('communications.created_at'),
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">
          {format(new Date(value), 'PPp', { 
            locale: i18n.language === 'es' ? es : enUS 
          })}
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('communications.title')}
            </h1>
            <p className="text-muted-foreground">
              {scheduleId 
                ? t('communications.description_schedule', { id: scheduleId })
                : t('communications.description')
              }
            </p>
          </div>
        </div>

        <DataTable
          data={mockCommunications}
          columns={columns}
          searchPlaceholder={`${t('actions.search')} ${t('communications.title').toLowerCase()}...`}
          title={t('communications.table_title')}
          description={t('communications.table_description')}
        />
      </div>
    </DashboardLayout>
  );
};
