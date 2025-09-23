import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@/hooks/useForm';
import { combineValidators, validators } from '@/utils/form/validation';
import { AgentFormData, AgentVariable } from '@/types/agent.types';
import { FormField } from '../FormField';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentFormProps {
  initialData?: Partial<AgentFormData>;
  onSubmit: (data: AgentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AgentForm: React.FC<AgentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { t } = useTranslation();
  const [detectedVariables, setDetectedVariables] = useState<string[]>([]);
  const [newVariable, setNewVariable] = useState('');

  const initialValues: AgentFormData = {
    name: '',
    description: '',
    channel: 'whatsapp',
    channelType: 'incoming',
    language: 'spanish',
    initialMessage: '',
    prompt: '',
    tools: '',
    temperature: 0.7,
    stability: 0.8,
    speed: 0.8,
    similarity: 0.8,
    variables: [],
    ...initialData
  };

  const validationSchema = (values: AgentFormData) => {
    const errors: Record<string, string> = {};
    
    const nameError = combineValidators(
      validators.required,
      validators.minLength(2)
    )(values.name);
    if (nameError) errors.name = nameError;

    const descriptionError = validators.required(values.description);
    if (descriptionError) errors.description = descriptionError;

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    getFieldProps,
    handleSubmit
  } = useForm({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      onSubmit(data);
    }
  });

  // Extract variables from text
  const extractVariables = useCallback((text: string) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables: string[] = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const variable = match[1].trim();
      if (!variables.includes(variable)) {
        variables.push(variable);
      }
    }
    
    setDetectedVariables(variables);
  }, []);

  // Handle text change with variable detection
  const handleTextChange = (field: keyof AgentFormData, value: string) => {
    setValue(field, value);
    if (field === 'initialMessage' || field === 'prompt') {
      extractVariables(value);
    }
  };

  // Add custom variable
  const addVariable = () => {
    if (!newVariable.trim()) return;
    
    const newVar: AgentVariable = {
      id: Date.now().toString(),
      name: newVariable.trim(),
      value: ''
    };
    
    setValue('variables', [...values.variables, newVar]);
    setNewVariable('');
  };

  // Remove variable
  const removeVariable = (id: string) => {
    setValue('variables', values.variables.filter(v => v.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {initialData ? t('agents.edit') : t('agents.create')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('agents.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">{t('form.basic_info')}</TabsTrigger>
            <TabsTrigger value="advanced">{t('form.advanced')}</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('form.basic_info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  label={t('agents.name')}
                  error={touched.name ? errors.name : undefined}
                  required
                >
                  <Input 
                    name="name"
                    value={values.name}
                    onChange={(e) => setValue('name', e.target.value)}
                    onBlur={() => setFieldTouched('name', true)}
                    placeholder={t('agents.name')} 
                  />
                </FormField>

                <FormField
                  label={t('agents.description_field')}
                  error={touched.description ? errors.description : undefined}
                  required
                >
                  <Textarea 
                    name="description"
                    value={values.description}
                    onChange={(e) => setValue('description', e.target.value)}
                    onBlur={() => setFieldTouched('description', true)}
                    placeholder={t('agents.description_field')}
                    rows={3}
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label={t('agents.channel')}>
                    <Select 
                      value={values.channel} 
                      onValueChange={(value) => setValue('channel', value as 'whatsapp' | 'calls')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">{t('channel.whatsapp')}</SelectItem>
                        <SelectItem value="calls">{t('channel.calls')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label={t('agents.channel_type')}>
                    <Select 
                      value={values.channelType} 
                      onValueChange={(value) => setValue('channelType', value as 'incoming' | 'outgoing')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incoming">{t('channel_type.incoming')}</SelectItem>
                        <SelectItem value="outgoing">{t('channel_type.outgoing')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <FormField label={t('agents.language')}>
                  <Select 
                    value={values.language} 
                    onValueChange={(value) => setValue('language', value as 'spanish' | 'english')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spanish">{t('language.spanish')}</SelectItem>
                      <SelectItem value="english">{t('language.english')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                {/* Call-specific settings */}
                {values.channel === 'calls' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t('agents.stability')}: {values.stability}
                        </Label>
                        <Slider
                          value={[values.stability]}
                          onValueChange={(value) => setValue('stability', value[0])}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t('agents.speed')}: {values.speed}
                        </Label>
                        <Slider
                          value={[values.speed]}
                          onValueChange={(value) => setValue('speed', value[0])}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t('agents.similarity')}: {values.similarity}
                        </Label>
                        <Slider
                          value={[values.similarity]}
                          onValueChange={(value) => setValue('similarity', value[0])}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('form.advanced')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Initial Message */}
                <FormField label={t('agents.initial_message')}>
                  {values.channel === 'calls' ? (
                    <Textarea
                      value={values.initialMessage}
                      onChange={(e) => handleTextChange('initialMessage', e.target.value)}
                      placeholder={t('agents.initial_message')}
                      rows={4}
                    />
                  ) : (
                    <Select 
                      value={values.initialMessage} 
                      onValueChange={(value) => handleTextChange('initialMessage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar mensaje inicial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greeting">Saludo de bienvenida</SelectItem>
                        <SelectItem value="menu">Mostrar menú</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  {detectedVariables.length > 0 && (
                    <div className="mt-2">
                      <Label className="text-xs text-muted-foreground">{t('variables.detected')}:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {detectedVariables.map((variable, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {`{{${variable}}}`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </FormField>

                {/* Prompt */}
                <FormField label={t('agents.prompt')}>
                  <Textarea
                    value={values.prompt}
                    onChange={(e) => handleTextChange('prompt', e.target.value)}
                    placeholder={t('agents.prompt')}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </FormField>

                {/* Tools */}
                <FormField label={t('agents.tools')}>
                  <div className="flex gap-2">
                    <Select value={values.tools} onValueChange={(value) => setValue('tools', value)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar tools" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="search">Búsqueda Web</SelectItem>
                        <SelectItem value="calendar">Calendario</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      {t('actions.create')}
                    </Button>
                  </div>
                </FormField>

                {/* RAG */}
                <FormField label={t('agents.rag')}>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </p>
                  </div>
                </FormField>

                {/* Variables */}
                <FormField label={t('agents.variables')}>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newVariable}
                        onChange={(e) => setNewVariable(e.target.value)}
                        placeholder={t('variables.variable_name')}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addVariable} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('actions.add')}
                      </Button>
                    </div>
                    
                    {values.variables.length > 0 && (
                      <div className="space-y-2">
                        {values.variables.map((variable) => (
                          <div key={variable.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <span className="text-sm font-medium">{variable.name}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeVariable(variable.id)}
                              className="ml-auto h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                {/* Temperature */}
                <FormField label={`${t('agents.temperature')}: ${values.temperature}`}>
                  <Slider
                    value={[values.temperature]}
                    onValueChange={(value) => setValue('temperature', value[0])}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Guardando...' : t('actions.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};