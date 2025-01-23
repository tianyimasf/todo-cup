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

  // Function to add a new row to the todo list
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

  // Function to handle changes in the todo table cells
  const handleRowChange = <K extends TodoKeys>(index: number, field: K, value: Todo[K]) => {
    const updatedTodos = [...todos];
    updatedTodos[index][field] = value;
    setTodos(updatedTodos);
  };

  // Function to save todos to backend
  const handleSave = async () => {
    try {
      console.log(JSON.stringify(todos))
      const response = await fetch('http://localhost:8000/api/todos', {
        method: 'post',
        headers: {
          'content-type': "application/json",
        },
        body: JSON.stringify(todos),
      });
      // If response is not OK, handle error
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text first
        throw new Error(errorText); // You can throw the error message returned
      }
      // If response is OK, parse it as JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Todos saved successfully:', data);
        alert('Todos saved successfully!');
      } else {
        throw new Error('Received invalid response from the server');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
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
          marginBottom: 2,
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
                {/* Using the combined add/save button component */}
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
