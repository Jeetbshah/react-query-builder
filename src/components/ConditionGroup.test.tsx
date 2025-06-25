import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConditionGroup from './ConditionGroup';
import { ConditionGroupType, FieldOption, OperatorOption } from './QueryBuilder';

const initialGroup: ConditionGroupType = {
  logic: 'AND',
  conditions: [
    {
      field: 'Status' as FieldOption,
      operator: 'equals' as OperatorOption,
      value: 'Open',
    },
  ],
};

describe('ConditionGroup', () => {
  it('renders with one condition', () => {
    render(<ConditionGroup group={initialGroup} onChange={() => {}} isRoot />);
    expect(screen.getByLabelText(/Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Operator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Value/i)).toBeInTheDocument();
  });

  it('can add a condition', () => {
    const handleChange = jest.fn();
    render(<ConditionGroup group={initialGroup} onChange={handleChange} isRoot />);
    fireEvent.click(screen.getByText('+ Add Condition'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('can add a group', () => {
    const handleChange = jest.fn();
    render(<ConditionGroup group={initialGroup} onChange={handleChange} isRoot />);
    fireEvent.click(screen.getByText('+ Add Group'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('can remove a condition', () => {
    const groupWithTwo: ConditionGroupType = {
      ...initialGroup,
      conditions: [
        ...initialGroup.conditions,
        { field: 'Priority' as FieldOption, operator: 'equals' as OperatorOption, value: 'High' },
      ],
    };
    const handleChange = jest.fn();
    render(<ConditionGroup group={groupWithTwo} onChange={handleChange} isRoot />);
    const deleteButtons = screen.getAllByLabelText('delete condition');
    fireEvent.click(deleteButtons[1]);
    expect(handleChange).toHaveBeenCalled();
  });
}); 