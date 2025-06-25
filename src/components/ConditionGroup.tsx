import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ConditionRow from './ConditionRow';
import { Condition, ConditionGroupType } from './QueryBuilder';

interface ConditionGroupProps {
  group: ConditionGroupType;
  onChange: (group: ConditionGroupType) => void;
  isRoot?: boolean;
}

const defaultCondition: Condition = {
  field: 'Status',
  operator: 'equals',
  value: 'Open',
};

const defaultGroup: ConditionGroupType = {
  logic: 'AND',
  conditions: [
    {
      field: 'Status',
      operator: 'equals',
      value: 'Open',
    },
  ],
};

const ConditionGroup: React.FC<ConditionGroupProps> = ({ group, onChange, isRoot }) => {
  const handleLogicChange = (_: React.MouseEvent<HTMLElement>, newLogic: 'AND' | 'OR') => {
    if (newLogic && newLogic !== group.logic) {
      onChange({ ...group, logic: newLogic });
    }
  };

  const handleConditionChange = (idx: number, newConditionOrGroup: Condition | ConditionGroupType) => {
    const newConditions = group.conditions.map((c, i) => (i === idx ? newConditionOrGroup : c));
    onChange({ ...group, conditions: newConditions });
  };

  const handleAddCondition = () => {
    onChange({ ...group, conditions: [...group.conditions, { ...defaultCondition }] });
  };

  const handleAddGroup = () => {
    onChange({ ...group, conditions: [...group.conditions, { ...defaultGroup }] });
  };

  const handleRemoveConditionOrGroup = (idx: number) => {
    const newConditions = group.conditions.filter((_, i) => i !== idx);
    onChange({ ...group, conditions: newConditions });
  };

  return (
    <Box border={isRoot ? 0 : 1} borderRadius={2} p={2} mb={2} borderColor="#ddd">
      <Box display="flex" alignItems="center" mb={2}>
        <ToggleButtonGroup
          value={group.logic}
          exclusive
          onChange={handleLogicChange}
          size="small"
        >
          <ToggleButton value="AND">AND</ToggleButton>
          <ToggleButton value="OR">OR</ToggleButton>
        </ToggleButtonGroup>
        <Box flexGrow={1} />
        <Button onClick={handleAddCondition} size="small" variant="outlined" sx={{ mr: 1 }}>+ Add Condition</Button>
        <Button onClick={handleAddGroup} size="small" variant="outlined">+ Add Group</Button>
      </Box>
      {group.conditions.map((cond, idx) =>
        'field' in cond ? (
          <ConditionRow
            key={idx}
            condition={cond}
            onChange={c => handleConditionChange(idx, c)}
            onRemove={() => handleRemoveConditionOrGroup(idx)}
            disableRemove={group.conditions.length === 1 && isRoot}
          />
        ) : (
          <Box key={idx} ml={2} mt={1}>
            <ConditionGroup
              group={cond}
              onChange={g => handleConditionChange(idx, g)}
              isRoot={false}
            />
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Button onClick={() => handleRemoveConditionOrGroup(idx)} size="small" color="error" variant="outlined">Remove Group</Button>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default ConditionGroup; 