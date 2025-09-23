import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { AgentForm } from '@/components/forms';
import { AgentFormData } from '@/types/agent.types';
import { toast } from '@/components/ui/use-toast';

export const CreateAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (data: AgentFormData) => {
    // TODO: Implement API call to create agent
    console.log('Creating agent:', data);
    toast({
      title: "Agente creado",
      description: "El agente se ha creado exitosamente",
    });
    navigate('/agents');
  };

  const handleCancel = () => {
    navigate('/agents');
  };

  return (
    <DashboardLayout>
      <AgentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </DashboardLayout>
  );
};