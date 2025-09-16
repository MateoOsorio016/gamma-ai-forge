import { useState, useCallback } from 'react';

export interface FormField {
  name: string;
  value: any;
  error?: string;
  touched?: boolean;
}

export interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name as string]: isTouched }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;
    
    const formErrors = validationSchema(values);
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    name: name as string,
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, e.target.value);
    },
    onBlur: () => {
      setFieldTouched(name, true);
    },
    error: touched[name as string] ? errors[name as string] : undefined,
  }), [values, errors, touched, setValue, setFieldTouched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
  };
}