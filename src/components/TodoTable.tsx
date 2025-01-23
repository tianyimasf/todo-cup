import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import EditableRow from './EditableRow';
import CombinedAddSaveButton from './CombinedAddSaveButton'; // Import the new combined button component

interface Todo {
  taskName: string;
  description: string;
  category: string;
  estimatedHours: number;
  estimatedMinutes: number;
  dueDate: string;
  completed: 'Incomplete' | 'Started' | 'In Progress' | 'Completed';
}

type TodoKeys = keyof Todo;

const TodoTable: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      taskName: '',
      description: '',
      category: '',
      estimatedHours: 0,
      estimatedMinutes: 0,
      dueDate: '',
      completed: 'Incomplete',
    },
  ]);

  const handleAddRow = () => {
    setTodos([
      ...todos,
      {
        taskName: '',
        description: '',
        category: '',
        estimatedHours: 0,
        estimatedMinutes: 0,
        dueDate: '',
        completed: 'Incomplete',
      },
    ]);
  };

  const handleRowChange = <K extends TodoKeys>(index: number, field: K, value: Todo[K]) => {
    const updatedTodos = [...todos];
    updatedTodos[index][field] = value;
    setTodos(updatedTodos);
  };

  const handleSave = () => {
    // Mock save function: Save data to localStorage (or send to backend)
    console.log('Saving Todos:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    alert('Todos saved successfully!');
  };

  return (
    <Box
      sx={{
        maxWidth: '80%',
        margin: 'auto',
        marginTop: 4,
        padding: 2,
      }}
    >
      {/* Stylish Title */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          marginBottom: 4,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #e0e0e0, #d3d3d3)',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontFamily: "'Goudy Bookletter 1911', serif",
            fontWeight: 'bold',
            fontSize: '3rem',
            color: '#4b3d31',
          }}
        >
          New To-do Quest
        </Typography>
        <Divider
          sx={{
            width: '50%',
            margin: '16px auto',
            height: '3px',
            backgroundColor: '#4b3d31',
            borderRadius: '2px',
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontStyle: 'italic',
            color: '#8f7c6d',
          }}
        >
          The best time to act is now.
        </Typography>
      </Box>

      {/* Table */}
      <Paper
        sx={{
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#d5d0c8',
            }}
          >
            <TableRow>
              {['Task Name', 'Description', 'Category', 'Hours', 'Minutes', 'Due Date', 'Status'].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      fontFamily: "'Goudy Bookletter 1911', serif",
                      color: '#4b3d31',
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <EditableRow
                key={index}
                rowData={todo}
                onRowChange={(field, value) => handleRowChange(index, field as TodoKeys, value)}
              />
            ))}
            <TableRow>
              <TableCell colSpan={7} sx={{ backgroundColor: "#d5d0c8" }} align="center">
                <CombinedAddSaveButton 
                  onAddClick={handleAddRow} 
                  onSaveClick={handleSave} 
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TodoTable;
