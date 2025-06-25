import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Condition, FieldOption, OperatorOption } from './QueryBuilder';

const fieldOptions: { label: string; value: FieldOption; values: string[] }[] = [
  { label: 'Status', value: 'Status', values: ['Open', 'In Progress', 'Closed'] },
  { label: 'Priority', value: 'Priority', values: ['Low', 'Medium', 'High'] },
  { label: 'Assigned To', value: 'Assigned To', values: ['User A', 'User B', 'User C'] },
  { label: 'Category', value: 'Category', values: ['Bug', 'Feature', 'Task'] },
];

const operatorOptions: { label: string; value: OperatorOption }[] = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not Equals', value: 'not equals' },
  { label: 'Contains', value: 'contains' },
  { label: 'Does Not Contain', value: 'does not contain' },
];

interface ConditionRowProps {
  condition: Condition;
  onChange: (condition: Condition) => void;
  onRemove: () => void;
  disableRemove?: boolean;
}

const ConditionRow: React.FC<ConditionRowProps> = ({ condition, onChange, onRemove, disableRemove }) => {
  const fieldDef = fieldOptions.find(f => f.value === condition.field) || fieldOptions[0];

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <TextField
        select
        label="Field"
        value={condition.field}
        onChange={e => onChange({ ...condition, field: e.target.value as FieldOption, value: fieldOptions.find(f => f.value === e.target.value)?.values[0] || '' })}
        size="small"
        sx={{ minWidth: 140, mr: 1 }}
      >
        {fieldOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Operator"
        value={condition.operator}
        onChange={e => onChange({ ...condition, operator: e.target.value as OperatorOption })}
        size="small"
        sx={{ minWidth: 140, mr: 1 }}
      >
        {operatorOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Value"
        value={condition.value}
        onChange={e => onChange({ ...condition, value: e.target.value })}
        size="small"
        sx={{ minWidth: 140, mr: 1 }}
      >
        {fieldDef.values.map(val => (
          <MenuItem key={val} value={val}>{val}</MenuItem>
        ))}
      </TextField>
      <IconButton onClick={onRemove} disabled={disableRemove} size="small" sx={{ ml: 1 }} aria-label="delete condition">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ConditionRow; 