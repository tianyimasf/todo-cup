import React, { ChangeEvent } from 'react';
import { TableRow, TableCell, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface EditableRowProps {
  rowData: {
    taskName: string;
    description: string;
    category: string;
    estimatedHours: number;
    estimatedMinutes: number;
    dueDate: string;
    completed: 'Incomplete' | 'Started' | 'In Progress' | 'Completed'; // Adjusted the type to string literals
  };
  onRowChange: (field: string, value: any) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({ rowData, onRowChange }) => {
  const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onRowChange(field, value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    onRowChange('completed', event.target.value);
  };

  return (
    <TableRow
      sx={{
        height: '40px',
        '&:nth-of-type(odd)': { backgroundColor: '#e8e6e3' },
        '&:nth-of-type(even)': { backgroundColor: '#eaeaea' },
      }}
    >
      <TableCell>
        <TextField
          value={rowData.taskName}
          onChange={handleInputChange('taskName')}
          placeholder="Task Name"
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField
          value={rowData.description}
          onChange={handleInputChange('description')}
          placeholder="Description"
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField
          value={rowData.category}
          onChange={handleInputChange('category')}
          placeholder="Category"
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          value={rowData.estimatedHours}
          onChange={handleInputChange('estimatedHours')}
          placeholder="Hours"
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          value={rowData.estimatedMinutes}
          onChange={handleInputChange('estimatedMinutes')}
          placeholder="Minutes"
        />
      </TableCell>
      <TableCell>
        <TextField
          type="date"
          value={rowData.dueDate}
          onChange={handleInputChange('dueDate')}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={rowData.completed}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="Started">Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
