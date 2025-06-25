import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ConditionGroup from './ConditionGroup';

export type FieldOption = 'Status' | 'Priority' | 'Assigned To' | 'Category';
export type OperatorOption = 'equals' | 'not equals' | 'contains' | 'does not contain';

export interface Condition {
  field: FieldOption;
  operator: OperatorOption;
  value: string;
}

export interface ConditionGroupType {
  logic: 'AND' | 'OR';
  conditions: (Condition | ConditionGroupType)[];
}

const initialGroup: ConditionGroupType = {
  logic: 'AND',
  conditions: [
    {
      field: 'Status',
      operator: 'equals',
      value: 'Open',
    },
  ],
};

const QueryBuilder: React.FC = () => {
  const [query, setQuery] = useState<ConditionGroupType>(initialGroup);
  const [showOutput, setShowOutput] = useState(false);

  const handleQueryChange = (newGroup: ConditionGroupType) => {
    setQuery(newGroup);
    setShowOutput(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOutput(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <ConditionGroup group={query} onChange={handleQueryChange} isRoot />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Build Query
          </Button>
        </Box>
      </form>
      {showOutput && (
        <Box mt={4}>
          <Typography variant="h6">Query Output</Typography>
          <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
            {JSON.stringify(query, null, 2)}
          </pre>
        </Box>
      )}
    </Paper>
  );
};

export default QueryBuilder; 