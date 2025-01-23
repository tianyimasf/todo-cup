// src/server.ts

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './models/Todo'; // Import the Todo model (we'll create it soon)

const PORT = 8000; // Port to run the backend
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors()); // To allow cross-origin requests

// MongoDB connection
const DB_URI = 'mongodb://localhost:27017/todoapp'; // Default MongoDB URI for local installation

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
// Get all to-do items
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Store the list of todos
app.post('/api/todos', async (req: Request, res: Response): Promise<any> => {
    const todos = req.body;
  
    // Validate incoming data
    if (!Array.isArray(todos) || todos.some(todo => !todo.taskName || !todo.description)) {
      return res.status(400).json({ message: 'Invalid data: Missing required fields.' });
    }
  
    try {
      // Perform saving logic (for example, inserting the data into MongoDB)
      // Assuming you have a `Todo` model in MongoDB
      const savedTodos = await Todo.insertMany(todos);
      res.status(200).json({ message: 'Todos saved successfully!', todos: savedTodos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving todos' });
    }
  });
  

// Update a to-do item
app.put('/api/todos/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { taskName, description, category, estimatedHours, estimatedMinutes, dueDate, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      taskName,
      description,
      category,
      estimatedHours,
      estimatedMinutes,
      dueDate,
      completed,
    }, { new: true });

    if (!updatedTodo) {
      return res.status(404).send('To-do item not found');
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).send('Error updating to-do item');
  }
});

// Delete a to-do item
app.delete('/api/todos/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send('To-do item not found');
    }
    res.json({ message: 'To-do item deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
