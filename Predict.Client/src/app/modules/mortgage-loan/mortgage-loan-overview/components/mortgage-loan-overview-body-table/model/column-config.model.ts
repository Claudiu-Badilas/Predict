export interface ColumnConfig {
  key:
    | 'administrationFee'
    | 'insuranceCost'
    | 'managementFee'
    | 'recalculatedInterest'
    | 'halfTotal'
    | 'remainingBalance';
  label: string;
  visible: boolean;
}

export const DEFAULT_COLUMN_CONFIGS: ColumnConfig[] = [
  {
    key: 'administrationFee',
    label: 'Comision Administrare',
    visible: false,
  },
  { key: 'insuranceCost', label: 'Costuri Asigurare', visible: false },
  { key: 'managementFee', label: 'Comision Management', visible: false },
  {
    key: 'recalculatedInterest',
    label: 'Rată Dobândă Recalculată',
    visible: false,
  },
  { key: 'halfTotal', label: '1/2', visible: false },
  { key: 'remainingBalance', label: 'Sold restant', visible: true },
];
