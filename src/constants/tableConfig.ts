export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

export const TABLE_ACTIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  DELETE: 'delete',
  DUPLICATE: 'duplicate',
  EXPORT: 'export',
} as const;

export type TableAction = typeof TABLE_ACTIONS[keyof typeof TABLE_ACTIONS];