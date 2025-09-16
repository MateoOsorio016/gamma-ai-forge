export const validators = {
  required: (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Este campo es requerido';
    }
    return '';
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Ingresa un email válido';
    }
    return '';
  },

  minLength: (minLength: number) => (value: string) => {
    if (value && value.length < minLength) {
      return `Debe tener al menos ${minLength} caracteres`;
    }
    return '';
  },

  maxLength: (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) {
      return `Debe tener máximo ${maxLength} caracteres`;
    }
    return '';
  },

  pattern: (pattern: RegExp, message: string) => (value: string) => {
    if (value && !pattern.test(value)) {
      return message;
    }
    return '';
  },

  number: (value: any) => {
    if (isNaN(Number(value))) {
      return 'Debe ser un número válido';
    }
    return '';
  },

  min: (min: number) => (value: number) => {
    if (value < min) {
      return `El valor mínimo es ${min}`;
    }
    return '';
  },

  max: (max: number) => (value: number) => {
    if (value > max) {
      return `El valor máximo es ${max}`;
    }
    return '';
  },
};

// Utility to combine multiple validators
export const combineValidators = (...validators: Array<(value: any) => string>) => {
  return (value: any) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return '';
  };
};